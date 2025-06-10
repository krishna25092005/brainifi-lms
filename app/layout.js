import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

export const metadata = {
  title: "BrainiFi - AI Learning Platform",
  description: "Personalized AI-powered learning experience",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
  ],
};

const outfit = Outfit({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="light" suppressHydrationWarning>
        <head>
          <meta name="color-scheme" content="light dark" />
        </head>
        <body
          className={`${outfit.className} bg-white dark:bg-gray-900`}
          suppressHydrationWarning
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
