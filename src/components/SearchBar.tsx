import { useState } from "react";
import { CraftInput, CraftButton } from "@/components/Craft";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, placeholder = "Search research papers...", isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <CraftInput
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <CraftButton type="submit" disabled={isLoading || !query.trim()}>
        <Search className="w-4 h-4 mr-1.5" />
        {isLoading ? "Searching..." : "Search"}
      </CraftButton>
    </form>
  );
}
