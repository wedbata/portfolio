import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { skills, tools } from "../portfolio";

export default defineTool({
  name: "list_skills",
  title: "List skills and tools",
  description: "List George's technical skills with proficiency levels, plus the tools he uses.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  outputSchema: {
    skills: z.array(z.object({ name: z.string(), level: z.number() })),
    tools: z.array(z.string()),
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ skills, tools }, null, 2) }],
    structuredContent: { skills, tools },
  }),
});