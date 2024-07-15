import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WatchOpia",
  description: "TMDB Alternative",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="relative top-0 z-50 ">
          <Nav />
        </header>

        {children}
      </body>
    </html>
  );
}
