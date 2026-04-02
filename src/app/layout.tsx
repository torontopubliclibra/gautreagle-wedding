import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syd & Dana Get Hitched",
  description: "Join us in celebrating our special day!",
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
      </body>
      <footer>
        <p>Website designed and developed by <a href="https://danateagle.com" target="_blank" rel="noopener noreferrer">Dana Teagle</a> and <a href="https://sydneygautreau.com" target="_blank" rel="noopener noreferrer">Sydney Gautreau</a>.</p>
      </footer>
    </html>
  );
}