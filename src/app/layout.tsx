import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Providers from "@/components/shared/Providers";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revive Mart",
  description: "A marketplace for buying and selling used items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                borderRadius: "8px",
                padding: "14px",
                fontSize: "16px",
              },
              success: {
                style: {
                  background: "#272727", // Purple background
                  color: "#fff",
                  border: "1px solid #272727", // Darker purple border
                },
                iconTheme: {
                  primary: "#272727",
                  secondary: "#fff",
                },
              },
              error: {
                style: {
                  background: "red", // Red background
                  color: "#fff",
                  border: "1px solid rgb(255, 0, 0)", // Darker red border
                },
                iconTheme: {
                  primary: "#272727",
                  secondary: "#fff",
                },
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
