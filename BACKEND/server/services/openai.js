import { OpenAI } from 'openai';
import 'dotenv/config'; 

// We create the instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// We export it as a NAMED variable
export { openai };