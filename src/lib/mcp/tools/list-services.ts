import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { services } from "../portfolio";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the services offered by George and Vibe Code Internet Service.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  outputSchema: { services: z.array(z.record(z.string(), z.unknown())) },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
