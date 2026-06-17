import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quantum-Safe Silicon — Testing chips against the quantum threat",
  description:
    "A research project testing new-generation quantum-safe chips for side-channel leakage before quantum attackers exist.",
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
