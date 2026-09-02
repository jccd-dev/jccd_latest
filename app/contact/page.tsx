import type { Metadata } from "next";
import Contact from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact | John Carlo Digay Portfolio",
  description:
    "Get in touch with John Carlo Digay about full-stack web development projects and freelance work.",
};

export default function ContactPage() {
  return <Contact />;
}
