

interface Message {
    role: "user" | "assistant",
    content: string
}

interface ChatHistoryProps {
    messages: Message[]
}

// alternative way to define the prop type
// type ChatHistoryProps = {
//     messages: {role: "user" | "assistant", content: string}
// }[]

export function ChatHistory({ messages }: ChatHistoryProps){
    
    


    return(
        null
    );  
}