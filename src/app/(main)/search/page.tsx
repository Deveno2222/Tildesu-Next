import Trends from "@/components/Trends";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

interface PageProps {
  searchParams: { q: string };
}

export function generateMetadata({ searchParams: { q } }: PageProps): Metadata {
  return {
    title: `Результат поиска "${q}"`,
  };
}

export default function Page({ searchParams: { q } }: PageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">
            Результат поиска &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <Trends />
    </main>
  );
}
