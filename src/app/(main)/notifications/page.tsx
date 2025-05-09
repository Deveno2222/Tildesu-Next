import { Metadata } from "next";
import Trends from "@/components/Trends";
import Notifications from "./Notifications";

export const metadata: Metadata = {
  title: "Уведомления",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Уведомления</h1>
        </div>
        <Notifications />
      </div>
      <Trends />
    </main>
  );
}
