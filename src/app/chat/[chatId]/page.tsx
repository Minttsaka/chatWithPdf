import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import ChatMobileSideBar from "@/components/ChatMobileSideBar";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  let isOpen:boolean=false

  return (
    <div className="flex max-h-screen">
      <div className="flex w-full max-h-screen">
        {/* chat sidebar */}
        <div className="hidden md:block max-w-xs overflow-scroll no-scrollbar">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="hidden md:block max-h-screen p-4 oveflow-scroll flex-[5] no-scrollbar">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200 oveflow-scroll no-scrollbar">
          <div className={`${isOpen?'block':'hidden'} md:hidden z-50 fixed top-0 left-0 bottom-0 right-[30%]`}>
            <ChatMobileSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
          </div>
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;