import { ChatBox } from "@/components/chat/chat-box";
import { SourcePanel } from "@/components/chat/source-panel";

export default function ChatPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <ChatBox />
      <SourcePanel />
    </main>
  );
}
