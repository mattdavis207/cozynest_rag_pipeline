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
import { SourcePanel } from './source-panel'
import { ArrowUpIcon, Square } from 'lucide-react'

export type ChatMessage = {
    id?: string;
    avatar?: string | undefined;
    role: "self" | "system";
    content: string;
    createdAt: Date;
    type: "message";
}

export type ChatSource = {
    id?: string;
    title?: string;
    content: string;
    similarity_score?: number;
    metadata?: Record<string, unknown>;
    chunk_index: number;
    source_type: string;
    source_uri: string;
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
    sources,
    onInputChange,
    onSubmit,
    onCancel,
}: ChatUIProps){
    const assistantAvatar = "/cozynest_rag_logo.png";

    return(
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">

        
        <Chat
            onSubmit={(event) => {
                event.preventDefault();
                void onSubmit(event.message);
            }}
        >
            <div className="flex min-w-0 flex-col gap-4">
                <ChatViewport className="h-[32rem]">
                    <ChatMessages className="w-full py-3">
                        {messages.map((message) => {
                        if (message.type === 'message') {
                            const bubbleVariant = message.role === 'system' ? 'peer' : 'self';

                            return (
                            <ChatMessageRow key={message.id} variant={bubbleVariant}>
                                {message.role === 'system' && (
                                <ChatMessageAvatar
                                    src={message.avatar ?? assistantAvatar}
                                    alt="CozyNest assistant"
                                    fallback="CN"
                                    className="border bg-white p-0.5"
                                />
                                )}
                                <ChatMessageBubble>{message.content}</ChatMessageBubble>
                                <ChatMessageTime dateTime={message.createdAt} />
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
        
        <div className="min-w-0 lg:sticky lg:top-20">
            <SourcePanel sources={sources}/>
        </div>

        </div>
    );
}
