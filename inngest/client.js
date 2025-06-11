import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "ai-lms",
  // Use environment variable with a fallback for development
  eventKey: process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY || "dev-brainifi-lms" 
});
