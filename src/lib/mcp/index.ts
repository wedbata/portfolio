import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import listServices from "./tools/list-services";
import listSkills from "./tools/list-skills";
import getContactInfo from "./tools/get-contact-info";

export default defineMcp({
  name: "george-s-digital-canvas",
  title: "George's Digital Canvas",
  version: "0.1.0",
  instructions:
    "Public tools for George's portfolio site (Vibe Code Internet Service). Use `list_projects` for portfolio work, `list_services` for what he offers, `list_skills` for his tech stack, and `get_contact_info` to reach him.",
  tools: [listProjects, listServices, listSkills, getContactInfo],
});