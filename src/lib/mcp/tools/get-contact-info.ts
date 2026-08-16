import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { contact } from "../portfolio";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Get the public contact details and availability for George / Vibe Code Internet Service.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  outputSchema: { contact: z.record(z.string(), z.string()) },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
    structuredContent: { contact },
  }),
});
