import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    // Reference for auto-scrolling
    const chatContainerRef = useRef(null);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return; // Prevent sending empty messages

        const userMessage = input;
        setResponses((prev) => [...prev, { user: userMessage, bot: '' }]);
        setInput('');  // Clear input field
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

    // Auto-scroll effect
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [responses, isTyping]);

    //chatbot logic ends here
    return (
        <>
            {/* Chat button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-5 right-5 p-3 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition duration-300 z-50"
            >
                <FaCommentDots size={24} />
            </button>

            {/* Chat window overlay */}
            {isChatOpen && (
                <div className="fixed bottom-16 right-5 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50">
                    <div className="flex flex-col h-full bg-gradient-to-br from-blue-100 via-white to-green-100 p-4">
                        <h1 className="text-xl font-semibold text-center mb-4 text-gray-700 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                            BOB AI Chatbot
                        </h1>
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                            {responses.map((res, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="self-end bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
                                        <strong>You:</strong> {res.user}
                                    </div>
                                    {res.bot && (
                                        <div className="self-start bg-gray-200 text-gray-800 p-3 rounded-lg shadow-lg max-w-xs mt-1">
                                            <strong>Bob:</strong> {res.bot}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-gray-200 p-3 rounded-lg shadow-lg max-w-xs animate-pulse mt-1">
                                    <strong>Bob:</strong> Typing...
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSendMessage} className="flex p-2 bg-white shadow-md rounded-lg mt-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg px-4 py-2 hover:from-green-500 hover:to-blue-500 transition duration-300"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
