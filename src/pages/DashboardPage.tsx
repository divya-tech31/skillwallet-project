import { useState, useEffect } from "react";
import { PageTransition, CraftButton, CraftInput } from "@/components/Craft";
import WorkspaceCard from "@/components/WorkspaceCard";
import { workspaceService } from "@/services/api";
import type { Workspace } from "@/services/mockData";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workspaceService.listWorkspaces().then(ws => {
      setWorkspaces(ws);
      setLoading(false);
    });
  }, []);

  const createWorkspace = async () => {
    if (!newName.trim()) return;
    const ws = await workspaceService.createWorkspace(newName.trim());
    setWorkspaces(prev => [...prev, ws]);
    setNewName("");
    toast.success(`Workspace "${ws.name}" created`);
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Workspaces</h1>
            <p className="text-muted-foreground text-sm">Organize your research into isolated contexts.</p>
          </div>
          <div className="flex gap-2">
            <CraftInput placeholder="New workspace name..." value={newName} onChange={e => setNewName(e.target.value)} />
            <CraftButton onClick={createWorkspace} disabled={!newName.trim()}>
              <Plus className="w-4 h-4 mr-1" /> Create
            </CraftButton>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card shadow-craft rounded-2xl p-2">
                <div className="bg-muted/30 rounded-lg p-4 h-24 animate-pulse-subtle" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workspaces.map(ws => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
