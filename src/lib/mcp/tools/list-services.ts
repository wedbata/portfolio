import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "../portfolio";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the services offered by George and Vibe Code Internet Service.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});