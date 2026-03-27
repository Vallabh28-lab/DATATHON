import express from 'express';
// Remove the curly braces
import { openai } from '../services/openai.js';

const router = express.Router();

router.post('/keyword', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant that identifies the single most important visual object in a paragraph. Output ONLY the word and nothing else. Example: 'Heart', 'Atom', 'Tree'."
        },
        {
          role: "user",
          content: content
        }
      ],
    });

    const keyword = response.choices[0].message.content.trim().replace(/[^\w\s]/gi, '');
    res.json({ keyword });

  } catch (error) {
    console.error('OpenAI Keyword Error:', error);
    res.status(500).json({ error: "Something went wrong with the Keyword service" });
  }
});

router.post('/simplify', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specializing in educational accessibility. 
          Your task is to take a complex lesson text and simplify it into a JSON array of small, actionable steps or "cards".
          - Each step should be concise (1-3 sentences).
          - Use very simple and encouraging language.
          - Output ONLY a valid JSON array of strings. 
          Example: ["Step 1: Introduction to Web Accessibility.", "Step 2: Understanding how screen readers work.", "Step 3: Why high contrast is important."]
          `
        },
        {
          role: "user",
          content: content
        }
      ],
    });

    try {
      // Try to parse the response as JSON. In case AI adds markdown code blocks, strip them.
      let result = response.choices[0].message.content.trim();
      if (result.startsWith('```json')) {
        result = result.replace(/```json|```/g, '').trim();
      }
      const steps = JSON.parse(result);
      res.json({ steps });
    } catch (parseError) {
      // Fallback: if AI doesn't return JSON, split by double newlines or sentences.
      const fallbackSteps = response.choices[0].message.content.split(/\n\d+\. |\n- |\n\n/).filter(s => s.trim().length > 0);
      res.json({ steps: fallbackSteps });
    }

  } catch (error) {
    console.error('OpenAI Simplification Error:', error);
    res.status(500).json({ error: "Something went wrong with the Simplification service" });
  }
});

router.post('/sign-translate', async (req, res) => {
  try {
    const { landmarks } = req.body;
    if (!landmarks) return res.status(400).json({ error: "Landmarks required" });
    
    // Mock prediction (integrate Google_Model.txt later)
    const prediction = landmarks.length > 10 ? "HELLO WORLD" : "UNKNOWN SIGN";
    const confidence = 0.92;

    res.json({ text: prediction, confidence });
  } catch (error) {
    console.error('Sign Translate Error:', error);
    res.status(500).json({ error: "Sign translation failed" });
  }
});

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
