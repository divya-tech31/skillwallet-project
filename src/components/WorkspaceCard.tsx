import { CraftCard } from "@/components/Craft";
import type { Workspace } from "@/services/mockData";
import { Folder, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const navigate = useNavigate();

  return (
    <CraftCard onClick={() => navigate(`/workspace/${workspace.id}`)}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Folder className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{workspace.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground tabular-data">{workspace.papers.length} papers</span>
          </div>
          <span className="text-xs text-muted-foreground">{workspace.created_at}</span>
        </div>
      </div>
    </CraftCard>
  );
}
