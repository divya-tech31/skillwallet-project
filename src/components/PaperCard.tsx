import { CraftCard, CraftButton } from "@/components/Craft";
import type { Paper } from "@/services/mockData";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

interface PaperCardProps {
  paper: Paper;
  onAdd?: (paper: Paper) => void;
  onRemove?: (paperId: string) => void;
  showAbstract?: boolean;
}

export default function PaperCard({ paper, onAdd, onRemove, showAbstract = true }: PaperCardProps) {
  return (
    <CraftCard>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-sm leading-snug text-foreground">{paper.title}</h4>
        <p className="text-xs text-muted-foreground">{paper.authors}</p>
        {showAbstract && (
          <p className="text-xs text-muted-foreground font-reading line-clamp-3">{paper.abstract}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground tabular-data">{paper.published_date}</span>
          <div className="flex gap-2">
            <a href={paper.link} target="_blank" rel="noopener noreferrer">
              <CraftButton variant="ghost" className="px-2 py-1">
                <ExternalLink className="w-3.5 h-3.5" />
              </CraftButton>
            </a>
            {onAdd && (
              <CraftButton variant="secondary" onClick={() => onAdd(paper)} className="text-xs px-2 py-1">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </CraftButton>
            )}
            {onRemove && (
              <CraftButton variant="ghost" onClick={() => onRemove(paper.id)} className="text-xs px-2 py-1 text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </CraftButton>
            )}
          </div>
        </div>
      </div>
    </CraftCard>
  );
}
