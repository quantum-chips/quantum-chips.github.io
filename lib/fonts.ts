import { Geist, Geist_Mono } from "next/font/google";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const fontVars = `${sans.variable} ${mono.variable}`;
