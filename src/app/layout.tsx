import type { Metadata } from "next";
import { Irish_Grover } from "next/font/google";
import StateProvider from "./context/State";
import "./globals.css";

const irish = Irish_Grover({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Word Quest",
  description: "Adivinhe a palavra,ganhe pontos e se divirta!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={irish.className}>
      <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
