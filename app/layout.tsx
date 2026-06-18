import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automating Security Testing of Quantum-Safe Chips",
  description:
    "A University of Queensland research project, with partner SEMICON TREND, automating side-channel security testing of new-generation quantum-safe chips.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
