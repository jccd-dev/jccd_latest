import Contact from "@/components/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Tell John Carlo Digay about your web application or business system project. Freelance full-stack developer working remotely from the Philippines.",
});

export default function ContactPage() {
  return <Contact />;
}
