"use client";

import { useState, FormEvent } from "react";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-mesaage-list";
import { ChatInput } from "@/components/ui/chat-input";

// Define the type for messages
type Message = {
  id: number;
  content: string;
  sender: "user" | "ai"; // Restrict sender to "user" or "ai"
};

export default function Chat() {
  // Explicitly define the type for messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>(""); // Define input as a string
  const [isLoading, setIsLoading] = useState<boolean>(false); // Define isLoading as a boolean

  // Function to send user input to the backend API
  async function sendUserInput(userInput: string): Promise<string> {
    try {
      const response = await fetch("https://aqibackend.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("AI response:", data.response);
      return data.response;
    } catch (error) {
      console.error("Error sending user input:", error);
      return "Error: Unable to get response from AI.";
    }
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty submissions

    // Add user message to the chat
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);

    setInput("");
    setIsLoading(true);

    // Call the API and get the AI response
    const aiResponse = await sendUserInput(input);

    // Add AI message to the chat
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: aiResponse,
        sender: "ai",
      },
    ]);

    setIsLoading(false);
  };

  const handleAttachFile = () => {
    // Implement file attachment if needed
  };

  const handleMicrophoneClick = () => {
    // Implement microphone input if needed
  };

  return (
    <div className="h-screen w-screen p-10 border bg-background rounded-lg flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                }
                fallback={message.sender === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
