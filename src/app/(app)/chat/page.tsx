import { getOrCreateAnonymousUser } from "@/app/actions";
import Chat from "@/features/app/chat/chat-client";
import { getChatSystemMessage } from "@/lib/chat-utils";
import { UserType } from "@prisma/client";
import { Message } from "ai";

export default async function ChatPage() {
  const user = await getOrCreateAnonymousUser();
  const initialMessages: Message[] = [
    {
      id: "1",
      role: "system",
      content: `${getChatSystemMessage(user?.type || UserType.NONE)}

Here is a little information about me: ${JSON.stringify(user)}. 



You always answer with properly formatted markdown.`,
    },
  ];

  return <Chat initialMessages={initialMessages} />;
}
