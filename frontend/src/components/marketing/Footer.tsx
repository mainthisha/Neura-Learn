import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Wordmark } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your AI-powered personal learning coach. Learn smarter. Achieve faster.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Features", to: "/features" },
                { label: "Dashboard", to: "/dashboard" },
                { label: "AI Chat", to: "/chat" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Careers", to: "/about" },
                { label: "Press", to: "/about" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Blog", to: "/about" },
                { label: "Guides", to: "/features" },
                { label: "Help Center", to: "/contact" },
                { label: "Community", to: "/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Neura Learn. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Crafted with care · Learn Smarter. Achieve Faster.</p>
        </div>
      </div>
    </footer>
  );
}
