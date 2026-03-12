// Mock data for the application

export interface Paper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  published_date: string;
  link: string;
}

export interface Workspace {
  id: number;
  name: string;
  papers: Paper[];
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const mockPapers: Paper[] = [
  {
    id: "2401.01234",
    title: "Attention Is All You Need: Revisiting Transformer Architectures for Scientific Discovery",
    authors: "Sarah Chen, Michael Zhang, Anna Kowalski",
    abstract: "We present a comprehensive study of transformer architectures applied to scientific discovery tasks. Our framework introduces novel attention mechanisms that capture long-range dependencies in molecular structures, achieving state-of-the-art results across multiple benchmarks. The proposed method demonstrates significant improvements in protein folding prediction and drug discovery pipelines.",
    published_date: "2024-01-15",
    link: "https://arxiv.org/abs/2401.01234",
  },
  {
    id: "2401.05678",
    title: "Graph Neural Networks for Knowledge Extraction from Academic Literature",
    authors: "James Liu, Priya Sharma, Roberto García",
    abstract: "This paper introduces GraphScholar, a novel graph neural network architecture designed for extracting structured knowledge from unstructured academic text. By modeling citations, co-authorship, and semantic similarity as a heterogeneous graph, our system achieves 94.2% accuracy in entity extraction and 87.6% in relation classification tasks.",
    published_date: "2024-01-22",
    link: "https://arxiv.org/abs/2401.05678",
  },
  {
    id: "2402.09012",
    title: "Retrieval-Augmented Generation for Domain-Specific Question Answering",
    authors: "Emily Watson, David Park, Yuki Tanaka",
    abstract: "We propose RAG-Expert, a retrieval-augmented generation framework optimized for domain-specific question answering. Our approach combines dense passage retrieval with a fine-tuned language model, incorporating a novel re-ranking mechanism that prioritizes contextually relevant passages. Experiments on medical, legal, and scientific QA benchmarks show consistent improvements.",
    published_date: "2024-02-08",
    link: "https://arxiv.org/abs/2402.09012",
  },
  {
    id: "2402.13456",
    title: "Multi-Agent Systems for Automated Research Synthesis",
    authors: "Alex Thompson, Maria Santos, Wei Li",
    abstract: "This work presents MARS (Multi-Agent Research Synthesis), a system employing multiple specialized AI agents for automated literature review and research synthesis. Each agent handles a distinct task—search, summarization, comparison, and gap identification—collaborating through a shared knowledge graph. Our evaluation shows MARS produces synthesis reports comparable to human researchers.",
    published_date: "2024-02-18",
    link: "https://arxiv.org/abs/2402.13456",
  },
  {
    id: "2403.17890",
    title: "Efficient Vector Search for Large-Scale Document Collections",
    authors: "Nina Patel, Oliver Brown, Sven Eriksson",
    abstract: "We introduce HierarchicalVS, a hierarchical vector search algorithm that achieves sub-millisecond query times on collections exceeding 100 million documents. Our method uses a novel clustering approach combined with product quantization, reducing memory requirements by 8x while maintaining 99.1% recall compared to exact nearest neighbor search.",
    published_date: "2024-03-05",
    link: "https://arxiv.org/abs/2403.17890",
  },
];

export const mockWorkspaces: Workspace[] = [
  {
    id: 1,
    name: "Transformer Research",
    papers: [mockPapers[0], mockPapers[2]],
    created_at: "2024-01-10",
  },
  {
    id: 2,
    name: "Knowledge Graphs",
    papers: [mockPapers[1]],
    created_at: "2024-02-01",
  },
  {
    id: 3,
    name: "Multi-Agent Systems",
    papers: [mockPapers[3], mockPapers[4]],
    created_at: "2024-03-01",
  },
];

export const mockChatResponses: Record<string, string> = {
  default: `Based on the papers in this workspace, here are the key insights:

**Main Themes:**
- The papers explore novel approaches to applying AI in research workflows
- There is a strong emphasis on retrieval-augmented methods for improved accuracy
- Multi-agent architectures show promise for complex research tasks

**Key Findings:**
1. Transformer-based models continue to push boundaries in scientific discovery
2. Vector search enables efficient knowledge retrieval at scale
3. Combining multiple specialized agents outperforms single-model approaches

Would you like me to dive deeper into any of these topics?`,
  summary: `## Paper Summary

The selected papers collectively address the challenge of **automated research assistance** through AI. Key contributions include:

- **Novel attention mechanisms** for capturing molecular structures (Chen et al.)
- **Graph-based knowledge extraction** achieving 94.2% accuracy (Liu et al.)
- **Retrieval-augmented generation** with domain-specific optimization (Watson et al.)
- **Multi-agent synthesis systems** matching human-level performance (Thompson et al.)
- **Hierarchical vector search** with sub-millisecond queries (Patel et al.)

The overarching trend points toward **modular, specialized AI systems** that collaborate to handle complex research workflows.`,
  compare: `## Comparative Analysis

| Aspect | Transformer Approach | Graph Neural Networks | RAG Framework |
|--------|---------------------|----------------------|---------------|
| **Accuracy** | State-of-the-art | 94.2% entity extraction | Domain-optimized |
| **Scalability** | High | Medium | High |
| **Domain Focus** | Scientific discovery | Academic literature | Multi-domain QA |
| **Key Innovation** | Novel attention | Heterogeneous graphs | Re-ranking mechanism |

**Recommendation:** For research paper analysis, the RAG framework offers the best balance of accuracy and flexibility, while the graph approach excels at structured knowledge extraction.`,
};
