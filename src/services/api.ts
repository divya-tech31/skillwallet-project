// Mock API service layer — replace with real API calls when backend is ready
import { mockPapers, mockWorkspaces, mockChatResponses, type Paper, type Workspace, type ChatMessage } from "./mockData";

const workspaces = [...mockWorkspaces];
let nextWorkspaceId = 4;
let isAuthenticated = false;
let currentUser: { email: string } | null = null;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth service
export const authService = {
  async login(email: string, password: string) {
    await delay(600);
    if (!email || !password) throw new Error("Email and password required");
    isAuthenticated = true;
    currentUser = { email };
    return { access_token: "mock_jwt_token", token_type: "bearer" };
  },

  async register(email: string, password: string) {
    await delay(800);
    if (!email || !password) throw new Error("Email and password required");
    isAuthenticated = true;
    currentUser = { email };
    return { access_token: "mock_jwt_token", token_type: "bearer" };
  },

  logout() {
    isAuthenticated = false;
    currentUser = null;
  },

  isAuthenticated: () => isAuthenticated,
  getCurrentUser: () => currentUser,
};

// Search service
export const searchService = {
  async searchPapers(query: string): Promise<Paper[]> {
    await delay(800);
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return mockPapers.filter(
      p =>
        p.title.toLowerCase().includes(lower) ||
        p.abstract.toLowerCase().includes(lower) ||
        p.authors.toLowerCase().includes(lower)
    );
  },
};

// Workspace service
export const workspaceService = {
  async listWorkspaces(): Promise<Workspace[]> {
    await delay(400);
    return workspaces;
  },

  async createWorkspace(name: string): Promise<Workspace> {
    await delay(500);
    const ws: Workspace = {
      id: nextWorkspaceId++,
      name,
      papers: [],
      created_at: new Date().toISOString().split("T")[0],
    };
    workspaces.push(ws);
    return ws;
  },

  async getWorkspace(id: number): Promise<Workspace | undefined> {
    await delay(300);
    return workspaces.find(w => w.id === id);
  },

  async addPaperToWorkspace(workspaceId: number, paper: Paper): Promise<void> {
    await delay(400);
    const ws = workspaces.find(w => w.id === workspaceId);
    if (!ws) throw new Error("Workspace not found");
    if (!ws.papers.find(p => p.id === paper.id)) {
      ws.papers.push(paper);
    }
  },

  async removePaperFromWorkspace(workspaceId: number, paperId: string): Promise<void> {
    await delay(300);
    const ws = workspaces.find(w => w.id === workspaceId);
    if (ws) {
      ws.papers = ws.papers.filter(p => p.id !== paperId);
    }
  },
};

// Chat service
export const chatService = {
  async sendMessage(workspaceId: number, question: string): Promise<string> {
    await delay(1200);
    const lower = question.toLowerCase();
    if (lower.includes("summar")) return mockChatResponses.summary;
    if (lower.includes("compar")) return mockChatResponses.compare;
    return mockChatResponses.default;
  },
};
