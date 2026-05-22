"use client"

import {
    Chat,
    ChatInputArea,
    ChatInputField,
    ChatInputSubmit,
    ChatMessageAvatar,
    ChatViewport,
    ChatMessageBubble,
    ChatMessageRow,
    ChatMessageTime,
    ChatMessages,

  } from '@/components/chat'
import { ArrowUpIcon, Square } from 'lucide-react'

export type ChatMessage = {
    id?: string;
    role: "self" | "system";
    content: string;
    createdAt: Date;
    type: "message";
}

export type ChatSource = {
    documentId?: number;
    title?: string;
    content: string;
    score?: number;
    metadata?: Record<string, unknown>;
}

export type ChatUIProps = {
    messages: ChatMessage[];
    input: string;
    isLoading: boolean;
    sources?: ChatSource[];
    onInputChange: (value: string) => void;
    onSubmit: (message: string) => void | Promise<void>;
    onCancel?: () => void;
}

// alternative way to define the prop type
// type ChatHistoryProps = {
//     messages: {role: "user" | "assistant", content: string}
// }[]

export function ChatUI({
    messages,
    input,
    isLoading,
    onInputChange,
    onSubmit,
    onCancel,
}: ChatUIProps){
    return(
        <Chat
            onSubmit={(event) => {
                event.preventDefault();
                void onSubmit(event.message);
            }}
        >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6">
                <ChatViewport className="h-96">
                    <ChatMessages className="w-full py-3">
                        {messages.map((message) => {
                        if (message.type === 'message') {
                            return (
                            <ChatMessageRow key={message.id} variant={message.role}>
                                <ChatMessageBubble>{message.content}</ChatMessageBubble>
                                {message.role !== 'system' && (
                                <ChatMessageTime dateTime={message.createdAt} />
                                )}
                            </ChatMessageRow>
                            )
                        }
                        return (
                            <div
                            className="text-muted-foreground my-6 text-center text-sm"
                            key={message.id}
                            >
                            {message.content}
                            </div>
                        )
                        })}
                    </ChatMessages>
                </ChatViewport>



                {/* Input Box Area */}
                <ChatInputArea>
                    <ChatInputField 
                        multiline
                        placeholder='Type your question here'
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            onInputChange(e.target.value)}
                    />
                    <ChatInputSubmit 
                        onClick={(e) => {
                            if (isLoading && onCancel) {
                            e.preventDefault()
                            onCancel()
                            }
                        }}
                        disabled={!input.trim() && !isLoading}
                    > 
                        {isLoading ? (
                        <Square className="size-[1em] fill-current" />
                        ) : (
                        <ArrowUpIcon className="size-[1.2em]" />
                        )}
                        <span className="sr-only">
                        {isLoading ? 'Stop streaming' : 'Send'}
                        </span>
                    </ChatInputSubmit>
                </ChatInputArea>
            </div>
        </Chat>
    );
}
