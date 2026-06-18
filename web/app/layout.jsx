import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Nav from "./components/Nav";
import Console from "./components/Console";

export const metadata = {
  title: "AI Edge — Intelligence Desk",
  description:
    "A personal AI intelligence desk: the newest, biggest developments in AI, plus tailored tools, money plays, and entertainment-industry disruption.",
  applicationName: "AI Edge",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AI Edge",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <div className="mx-auto flex min-h-[100dvh] max-w-desk flex-col px-5 pb-28 pt-[max(env(safe-area-inset-top),1rem)] sm:pb-16">
          {children}
        </div>
        <Console />
        <Nav />
      </body>
    </html>
  );
}
