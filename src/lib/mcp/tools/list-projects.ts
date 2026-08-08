import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../portfolio";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description:
    "List the public portfolio projects George has built, optionally filtered by category.",
  inputSchema: {
    category: z
      .enum(["Web App", "Landing Page", "E-Commerce"])
      .optional()
      .describe("Optional category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const rows = category ? projects.filter((p) => p.category === category) : projects;
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { projects: rows },
    };
  },
});