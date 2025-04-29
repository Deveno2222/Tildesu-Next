import PostEditor from "@/components/posts/editor/PostEditor";

import Trends from "@/components/Trends";

import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import FollowingFeed from "./FollowingFeed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">Для вас</TabsTrigger>
            <TabsTrigger value="following">Подписки</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <Trends />
    </main>
  );
}
