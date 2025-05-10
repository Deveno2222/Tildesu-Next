import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Сообщения",
};

export default function Page() {
  return <Chat />;
}
