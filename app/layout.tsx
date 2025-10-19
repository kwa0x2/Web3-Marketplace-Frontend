import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Web3Provider } from "@/context/web3.provider";
import { AuthProvider } from "@/context/auth.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Marketplace",
  description: "Alper KARAKOYUN - Web3 Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
