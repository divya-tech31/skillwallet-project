import { useState } from "react";
import { PageTransition } from "@/components/Craft";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import { searchService, workspaceService } from "@/services/api";
import type { Paper } from "@/services/mockData";
import { toast } from "sonner";

export default function SearchPage() {
  const [results, setResults] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearched(true);
    const papers = await searchService.searchPapers(query);
    setResults(papers);
    setLoading(false);
  };

  const handleAdd = async (paper: Paper) => {
    try {
      // Add to first workspace as default
      await workspaceService.addPaperToWorkspace(1, paper);
      toast.success(`Added "${paper.title.slice(0, 40)}..." to workspace`);
    } catch {
      toast.error("Failed to add paper");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Discover Papers</h1>
        <p className="text-muted-foreground text-sm mb-8">Search across arXiv research papers</p>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        <div className="mt-8 flex flex-col gap-4">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-card shadow-craft rounded-2xl p-2">
                  <div className="bg-muted/30 rounded-lg p-4 h-28 animate-pulse-subtle" />
                </div>
              ))}
            </div>
          )}
          {!loading && results.map(paper => (
            <PaperCard key={paper.id} paper={paper} onAdd={handleAdd} />
          ))}
          {!loading && searched && results.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No papers found. Try a different search query.</p>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
