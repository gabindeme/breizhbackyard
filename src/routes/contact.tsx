import { pageMeta } from "@/lib/meta";
import { organizationSchema } from "@/lib/seoSchemas";
export { Contact as default } from "@/pages/Contact";

export const meta = () => pageMeta({ page: "contact", path: "/contact", jsonLd: [organizationSchema] });
