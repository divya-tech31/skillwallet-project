import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageTransition } from "@/components/Craft";
import PaperCard from "@/components/PaperCard";
import { workspaceService } from "@/services/api";
import type { Workspace } from "@/services/mockData";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { CraftButton } from "@/components/Craft";
import { toast } from "sonner";

export default function WorkspacePage() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      workspaceService.getWorkspace(Number(id)).then(ws => {
        setWorkspace(ws || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleRemove = async (paperId: string) => {
    if (!workspace) return;
    await workspaceService.removePaperFromWorkspace(workspace.id, paperId);
    setWorkspace(prev => prev ? { ...prev, papers: prev.papers.filter(p => p.id !== paperId) } : null);
    toast.success("Paper removed");
  };

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">Loading...</div>;
  if (!workspace) return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">Workspace not found</div>;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Link to="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to workspaces
        </Link>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{workspace.name}</h1>
            <p className="text-sm text-muted-foreground tabular-data">{workspace.papers.length} papers</p>
          </div>
          <Link to={`/chat?workspace=${workspace.id}`}>
            <CraftButton>
              <MessageSquare className="w-4 h-4 mr-1.5" /> Chat with AI
            </CraftButton>
          </Link>
        </div>

        {workspace.papers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No papers in this workspace yet.</p>
            <Link to="/search"><CraftButton variant="secondary">Search Papers</CraftButton></Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {workspace.papers.map(paper => (
              <PaperCard key={paper.id} paper={paper} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
