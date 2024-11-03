import React, { useState } from 'react';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return; // Prevent sending empty messages

        const userMessage = input;
        setResponses((prev) => [...prev, { user: userMessage, bot: '' }]);
        setInput(''); // Clear input field
        setIsTyping(true); // Start typing indicator

        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setResponses((prev) => {
                const updatedResponses = [...prev];
                updatedResponses[updatedResponses.length - 1].bot = data.response;
                return updatedResponses;
            });
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setIsTyping(false); // Stop typing indicator
        }
    };
//chatbot logic ends here
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
            <div className="flex-1 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Bob AI Chatbot</h1>
                <div className="space-y-4">
                    {responses.map((res, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="self-end bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs transition-all duration-300 ease-in-out">
                                <strong>You:</strong> {res.user}
                            </div>
                            {res.bot && (
                                <div className="self-start bg-gray-300 p-3 rounded-lg shadow-lg max-w-xs transition-all duration-300 ease-in-out">
                                    <strong>Bob:</strong> {res.bot}
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="self-start bg-gray-300 p-3 rounded-lg shadow-lg max-w-xs transition-all duration-300 ease-in-out animate-pulse">
                            <strong>Bob:</strong> Typing...
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="flex p-2 bg-white shadow-lg rounded-lg mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
