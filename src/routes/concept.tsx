import { pageMeta, conceptFaqSchema } from "@/lib/meta";
import { sportsEventSchema } from "@/lib/seoSchemas";
export { Concept as default } from "@/pages/Concept";

export const meta = () => pageMeta({ page: "concept", path: "/concept", jsonLd: [sportsEventSchema, conceptFaqSchema()] });
