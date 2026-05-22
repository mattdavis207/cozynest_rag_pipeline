"use client"

import { useState } from "react";
import { ChatUI, type ChatMessage } from "@/components/chat/chat-ui";

export default function ChatPage() {
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(message: string) {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        role: "self",
        content: message,
        createdAt: new Date(),
        type: "message",
      },
    ]);
    setInput("");

    try {
      
      setIsLoading(true);

      const response = await fetch("api/chat", {
        method: "POST",
        body: JSON.stringify({message})
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      // append system response to messages
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: result.message,
          createdAt: new Date(),
          type: "message",
        },
      ]);

    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
   
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Chat</h1>
      <p className="mt-2 text-muted-foreground">
        Chat with CozyNest RAG AI Assistant about any question you have about our products, policies or shipping. 
      </p>

      <ChatUI
        messages={messages}
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
