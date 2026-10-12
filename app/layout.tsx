import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ground"
        >
          Skip to content
        </a>
        <Nav />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
