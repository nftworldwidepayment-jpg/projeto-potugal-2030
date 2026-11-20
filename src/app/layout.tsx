import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.shortName,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  appleWebApp: {
    capable: true,
    title: "PP 2030",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: siteConfig.shortName,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  // Ocupa todo o ecrã em telemóveis com entalhe; as margens respeitam as áreas seguras.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-surface print:bg-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
