// ============================================
// GEMINI API INTEGRATION FOR ADHD MEMORY AID
// ============================================

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API - SECURE VERSION
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const WORKING_MODEL = "models/gemini-2.5-flash"; // ✅ Confirmed working model

// ============================================
// 1. CHAT FUNCTIONALITY
// ============================================

export async function sendChatMessage(message, conversationHistory = []) {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const context = `You are an AI Memory Assistant for people with ADHD. 
Your role is to:
- Help users remember tasks and important information
- Extract actionable items from their messages
- Set priorities and suggest times
- Provide ADHD-friendly memory strategies
- Be encouraging and supportive

Previous conversation:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${message}

Respond helpfully and concisely.`;

    const result = await model.generateContent(context);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

// ============================================
// 2. TASK EXTRACTION FROM TEXT
// ============================================

export async function extractTasks(text) {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const prompt = `Extract all tasks, action items, and reminders from this text. For each task, identify:
- Title (clear, concise)
- Time/Date (if mentioned, otherwise suggest "Today" or "This week")
- Priority (urgent/high/medium/low based on context)
- Category (Work/Personal/Health/Shopping/Social/Other)

Text: "${text}"

Respond ONLY with valid JSON array in this exact format:
[
  {
    "title": "task name",
    "time": "when to do it",
    "priority": "urgent/high/medium/low",
    "category": "category name",
    "confidence": 95
  }
]

If no tasks found, return: []`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();
    
    const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || 
                     jsonText.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const tasks = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      return tasks;
    }
    
    return [];
  } catch (error) {
    console.error("Task Extraction Error:", error);
    return [];
  }
}

// ============================================
// 3. SMART REMINDER SUGGESTIONS
// ============================================

export async function generateReminderSuggestions(task) {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const prompt = `For this task: "${task}", suggest:
1. Best time to do it (considering ADHD optimal focus times)
2. How to remember it (memory technique)
3. Any helpful context

Respond in JSON format:
{
  "suggestedTime": "time suggestion",
  "memoryTip": "helpful memory technique",
  "context": "additional helpful info"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();
    
    const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || 
                     jsonText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error("Reminder Suggestion Error:", error);
    return null;
  }
}

// ============================================
// 4. MEMORY ANALYSIS & INSIGHTS
// ============================================

export async function analyzeMemoryPatterns(userHistory) {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const prompt = `Analyze this user's task history and provide insights:
${JSON.stringify(userHistory, null, 2)}

Provide ADHD-specific insights about:
1. When they're most productive
2. What they tend to forget
3. Personalized recommendations

Respond in JSON format:
{
  "bestTimes": ["time periods"],
  "forgetfulPatterns": ["patterns"],
  "recommendations": ["suggestions"]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();
    
    const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || 
                     jsonText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error("Memory Analysis Error:", error);
    return null;
  }
}

// ============================================
// 5. SUMMARIZE NOTES/THOUGHTS
// ============================================

export async function summarizeThoughts(text) {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const prompt = `Summarize these thoughts/notes into clear, organized bullet points.
Make it ADHD-friendly: concise, actionable, and easy to scan.

Text: "${text}"

Provide a clear summary with action items separated.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Summarization Error:", error);
    return "Unable to summarize at this time.";
  }
}

// ============================================
// 6. ADHD TIPS & STRATEGIES
// ============================================

export async function getADHDTip(category = "general") {
  try {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });
    
    const prompt = `Provide a helpful, evidence-based ADHD tip about: ${category}
Make it:
- Practical and actionable
- Encouraging
- Based on ADHD research
- Short (2-3 sentences)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("ADHD Tip Error:", error);
    return "Remember: You're doing great! Break tasks into smaller steps.";
  }
}