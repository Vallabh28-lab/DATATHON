import express from 'express';
import { openai } from '../services/openai.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Explain in a simple, accessible way for students with different abilities. Focus on clarity and encouraging language."
        },
        {
          role: "user",
          content: query
        }
      ],
    });

    res.json({
      answer: response.choices[0].message.content,
    });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: "Something went wrong with the AI service" });
  }
});

export default router;
