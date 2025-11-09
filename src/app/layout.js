import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import { ToastContainer } from "react-toastify";
import SessionProviderWrapper from "./Provider/SessionProviderWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Linktree Clone",
  description: "Linktree clone by code with harry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
      
        <SessionProviderWrapper>
          <Navbar />
          {children}
          </SessionProviderWrapper>
      </body>
    </html>
  );
}
