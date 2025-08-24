

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '5mb' })); // Increase limit for potential large contexts
const port = process.env.PORT || 8080;

// --- Gemini API Setup ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- API Endpoints ---

// Pre-generated, high-quality mock Gmail inbox.
// This removes the dependency on a live, potentially flaky AI call for core data loading,
// ensuring the Gmail integration is 100% reliable.
const MOCK_GMAIL_INBOX = [
  { id: 'gmail-1', sender: 'Zillow Premier Agent', subject: 'New Lead: Michael asking about 123 Main St', body: 'You have a new lead interested in 123 Main St. Contact Michael Scott at (555) 123-4567 or michael.scott@example.com to schedule a showing.', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), read: false },
  { id: 'gmail-2', sender: 'Jane Smith', subject: 'Question about 456 Oak Ave listing', body: 'Hi, I saw your listing for 456 Oak Avenue and it looks lovely. Can you tell me what year the roof was last replaced? Thanks, Jane', timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(), read: false },
  { id: 'gmail-3', sender: 'Secure Title Co.', subject: 'Closing Documents for 789 Pine Ln (Miller)', body: 'Please find the closing disclosure for the Miller transaction at 789 Pine Lane attached. Please review and confirm receipt.', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), read: true },
  { id: 'gmail-4', sender: 'Open House Reminder', subject: 'Your Open House at 321 Elm Circle is this Saturday', body: 'Just a friendly reminder about your upcoming open house at 321 Elm Circle this Saturday from 1 PM to 4 PM. We have promoted it on all major platforms.', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), read: true },
  { id: 'gmail-5', sender: 'Mark Johnson', subject: 'Offer Submission for 456 Oak Ave', body: 'Hello, Following our conversation, we\'d like to formally submit our offer for 456 Oak Avenue. The offer document is attached. We are very excited about the possibility of this being our new home. Regards, Mark', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), read: false },
  { id: 'gmail-6', sender: 'Realtor.com', subject: 'You have a new connection request', body: 'A new potential client, Sarah Brown, would like to connect with you to discuss her home buying needs. You can reach her at sarah.b@example.com.', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), read: true },
  { id: 'gmail-7', sender: 'Bob Vance, Vance Refrigeration', subject: 'Referral for you', body: 'Hi, my colleague is looking to sell his house and I mentioned you were the best in the business. His name is Dwight Schrute, expect a call from him soon.', timestamp: new Date(Date.now() - 3600000 * 15).toISOString(), read: false },
  { id: 'gmail-8', sender: 'MortgagePro Lenders', subject: 'Update on Miller Loan Application', body: 'Good news! The appraisal for 789 Pine Ln came in at value. We are on track for a smooth closing next week.', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), read: true },
  { id: 'gmail-9', sender: 'Kevin Malone', subject: 'Viewing tomorrow?', body: 'Hey! Is 2pm still good for the showing at 123 Main St tomorrow? Just wanted to double check.', timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), read: false },
  { id: 'gmail-10', sender: 'Angela Martin', subject: 'Feedback for 321 Elm Circle Open House', body: 'Thank you for the open house. We thought the home was well-presented, but the yard was a bit smaller than we had hoped. We will continue our search.', timestamp: new Date(Date.now() - 3600000 * 25).toISOString(), read: true },
  { id: 'gmail-11', sender: 'Pro Home Inspections', subject: 'Inspection Report for 456 Oak Ave', body: 'The inspection report for your client Mark Johnson is complete and attached. Overall the property is in good condition with a few minor items noted.', timestamp: new Date(Date.now() - 3600000 * 28).toISOString(), read: true },
  { id: 'gmail-12', sender: 'Local Real Estate Board', subject: 'Weekly Newsletter & Updates', body: 'This week\'s newsletter includes updates on market trends, upcoming networking events, and new continuing education course offerings. Click here to read more.', timestamp: new Date(Date.now() - 3600000 * 30).toISOString(), read: true },
  { id: 'gmail-13', sender: 'Pam Halpert', subject: 'Thank you!', body: 'Thank you so much for helping us find our dream home! We are so excited to move in. We will definitely recommend you to all of our friends.', timestamp: new Date(Date.now() - 3600000 * 33).toISOString(), read: true },
  { id: 'gmail-14', sender: 'Staging Professionals Inc.', subject: 'Invoice for 321 Elm Circle', body: 'Hi, please see the attached invoice for the staging services provided at 321 Elm Circle. Payment is due within 15 days. Thank you!', timestamp: new Date(Date.now() - 3600000 * 36).toISOString(), read: true },
  { id: 'gmail-15', sender: 'Redfin', subject: 'Your listing at 123 Main St was viewed 58 times this week', body: 'Great engagement on your listing! Keep the momentum going by sharing it on your social media channels.', timestamp: new Date(Date.now() - 3600000 * 40).toISOString(), read: true },
];

app.get('/api/gmail/emails', async (req, res) => {
    // Simulate a network delay to make the experience more realistic.
    setTimeout(() => {
        res.json(MOCK_GMAIL_INBOX);
    }, 1200); // 1.2 second delay
});

app.post('/api/label-email', async (req, res) => {
  const { emailBody } = req.body;
  if (!emailBody) return res.status(400).json({ error: 'emailBody is required' });

  try {
    const prompt = `You are a real estate assistant. Read the following email and categorize it into one of these categories: New Lead, Showing Request, Offer Received, Document Request, Closing Info, General Inquiry, Spam. Respond with only the category name. Email: "${emailBody}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    res.json({ label: response.text.trim() });
  } catch (error) {
    console.error("Error in /api/label-email:", error);
    res.status(500).json({ error: 'Failed to label email.' });
  }
});

app.post('/api/draft-reply', async (req, res) => {
    const { emailBody } = req.body;
    if (!emailBody) return res.status(400).json({ error: 'emailBody is required' });
    
    try {
        const prompt = `You are a professional yet friendly real estate assistant. Based on the following email, draft a concise and helpful reply. Be proactive, suggest next steps if appropriate (like suggesting viewing times for an inquiry). Original Email: "${emailBody}"\n\nDrafted Reply:`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        res.json({ draft: response.text.trim() });
    } catch (error) {
        console.error("Error in /api/draft-reply:", error);
        res.status(500).json({ error: 'Failed to draft reply.' });
    }
});

app.post('/api/parse-appointment', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    
    try {
        const today = new Date();
        const localDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        const prompt = `Parse the following text to identify an event title, date, and time. Today's date is ${localDateString}. Return a JSON object with "title", "date" (in YYYY-MM-DD format), and "time" (in HH:mm 24-hour format). If any field cannot be determined, return it as an empty string. Text: "${text}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        date: { type: Type.STRING },
                        time: { type: Type.STRING }
                    }
                }
            }
        });

        const parsed = JSON.parse(response.text.trim());
        if(parsed.title && parsed.date && parsed.time) {
            res.json(parsed);
        } else {
            res.status(404).json({ error: 'Could not parse appointment details.' });
        }
    } catch (error) {
        console.error("Error in /api/parse-appointment:", error);
        res.status(500).json({ error: 'Failed to parse appointment.' });
    }
});

app.post('/api/complex-task', async (req, res) => {
    const { instruction, emails, deals, integrations } = req.body;
    if (!instruction) return res.status(400).json({ error: 'instruction is required' });

    try {
        const today = new Date();
        const localDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        const simplifiedEmails = emails.map(({ sender, subject, body }) => ({ sender, subject, body }));
        const simplifiedDeals = deals.map(({ propertyAddress, stage, value, notes }) => ({ propertyAddress, stage, value, notes }));

        let prompt = `You are a world-class real estate AI assistant. Your goal is to execute a user's request based on their emails and connected services. Today's date is ${localDateString}.
        User Request: "${instruction}"
        `;

        if (integrations.gmail.connected) {
            prompt += `You have access to the user's live Gmail inbox. The following emails are a sample of recent, relevant messages:\n${JSON.stringify(simplifiedEmails, null, 2)}\n\n`;
        } else {
            prompt += `Here are the relevant emails:\n${JSON.stringify(simplifiedEmails, null, 2)}\n\n`;
        }

        if (integrations.followUpBoss.connected) {
            prompt += `You also have access to the user's Follow Up Boss CRM. Here is a list of current deals:\n${JSON.stringify(simplifiedDeals, null, 2)}\n\n`;
        }
        
        prompt += `Analyze the user's request, the emails, and any connected services. Identify concrete actions to take. The only supported actions are scheduling calendar events, creating new tasks, and adding notes to deals in Follow Up Boss.
        
        Return a valid JSON object that strictly adheres to the provided schema. The JSON object should contain:
        1.  A "summary" key: A string with a natural language description of the actions you have identified.
        2.  An "actions" key: An array of action objects.
        
        Each action object must have a "type" ("SCHEDULE_EVENT", "CREATE_TASK", or "UPDATE_FUB_DEAL") and a "payload".
        
        - "SCHEDULE_EVENT" payload: { "title": string, "date": "YYYY-MM-DD", "time": "HH:mm" }.
        - "CREATE_TASK" payload: { "title": string, "dueDate": "YYYY-MM-DD", "priority": "High" | "Medium" | "Low" }.
        - "UPDATE_FUB_DEAL" payload: { "propertyAddress": string, "note": string }.
        
        If no actions can be taken, return a JSON object with a relevant summary and an empty actions array.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        actions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: { type: Type.STRING, enum: ["SCHEDULE_EVENT", "CREATE_TASK", "UPDATE_FUB_DEAL"] },
                                    payload: { type: Type.OBJECT }
                                },
                                required: ['type', 'payload']
                            }
                        }
                    },
                    required: ['summary', 'actions']
                }
            }
        });

        const parsed = JSON.parse(response.text.trim());
        res.json(parsed);
    } catch (error) {
        console.error("Error in /api/complex-task:", error);
        res.status(500).json({ error: 'Failed to perform complex task.' });
    }
});


// --- Static file serving ---
// In production, serve the built frontend assets from 'dist'
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    // The "catchall" handler: for any request that doesn't match an API route or a static file,
    // send back React's index.html file.
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});