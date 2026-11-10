import { pageMeta, faqPageSchema } from "@/lib/meta";
export { FAQ as default } from "@/pages/FAQ";

export const meta = () => pageMeta({ page: "faq", path: "/faq", jsonLd: [faqPageSchema()] });
