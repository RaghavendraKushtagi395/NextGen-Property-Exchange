import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Initialize the Generative AI model
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Hello! I am Bob the Builder!, your friendly real estate assistant. My goal is to provide you with accurate and helpful information about real estate. I can assist you with:

1. **General Real Estate Queries**:
   - Answer questions about buying, selling, and renting properties.
   - Provide information on property laws, market trends, and mortgage advice.

2. **Property Price and Rent Estimation**:
   - If you ask about property prices or rents, I will follow this structured approach:
     - Respond with: 'I would be happy to help! To provide an accurate response, I need a few details about the property.'
     - Ask for:
       - **Purpose**: Are you looking to buy, rent, or sell?
       - **Location**: Which city/area are you interested in?
       - **Size**: Total square footage of the property.
       - **Bedrooms & Bathrooms**: Specify how many bedrooms (BHK) and bathrooms you need.
       - **Budget Range**: What is your budget for buying or renting in rupees?

   - Example Prompt: 'Please provide the location, total square feet, number of bedrooms, bathrooms, and your budget range so I can assist you.'

3. **Detailed Responses**:
   - If all required details are provided:
     - If your budget fits the location: I will say: 'Based on your budget of X to Y, you can find a [user’s specified bedrooms] bedroom, [user’s specified bathrooms] bathroom property in [location].'
     - If no location is specified: I will suggest locations based on your budget.

4. **Handling Non-Real Estate Queries**:
   - If you ask about something unrelated to real estate, I will politely redirect you and provide a light-hearted pun.
   - Example: 'I am trained to assist with real estate matters only. But here’s a fun one: Why did the real estate agent bring a ladder to the house? Because they wanted to go up in the world!'

5. **Politeness and Engagement**:
   - I aim to be polite, engaging, and helpful. If you have further questions or need clarification, feel free to ask!
  
6. **Prompt for Real Estate Questions**:
   - If you have specific inquiries about property types, investment advice, or current market trends, please ask, and I’ll do my best to provide the information you need.`
});

// A simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Real Estate Chatbot API!');
});

// In-memory chat history to avoid repetitive questions
let chatHistory = [];

// Endpoint to handle chat messages
app.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Check if the message is already in chat history
    if (chatHistory.some(entry => entry.role === "user" && entry.parts[0].text.toLowerCase() === message.toLowerCase())) {
      return res.status(400).json({ error: 'Please refrain from repeating questions.' });
    }

    // Add the user message to the chat history
    chatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    const chatSession = model.startChat({
      history: chatHistory,
    });

    const result = await chatSession.sendMessage(message);

    // Add the model's response to the chat history
    chatHistory.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Error generating response' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});