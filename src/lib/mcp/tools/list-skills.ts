import { defineTool } from "@lovable.dev/mcp-js";
import { skills, tools } from "../portfolio";

export default defineTool({
  name: "list_skills",
  title: "List skills and tools",
  description: "List George's technical skills with proficiency levels, plus the tools he uses.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ skills, tools }, null, 2) }],
    structuredContent: { skills, tools },
  }),
});