import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syd & Dana Get Hitched",
  description: "Join us in celebrating our special day!",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          <p>This website was designed and developed by <a href="https://danateagle.com" target="_blank" rel="noopener noreferrer">Dana Teagle</a> and <a href="https://sydneygautreau.com" target="_blank" rel="noopener noreferrer">Sydney Gautreau</a> in Toronto, Ontario.</p>
        </footer>
      </body>
    </html>
  );
}