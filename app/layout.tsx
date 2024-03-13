import Navbar from "@/components/navbar";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import "@/style/global.css";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Promptify",
  description: "A simple prompt generator",
  icons: "/logo.png",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* Background gradient */}
        <div className="main">
          <div className="gradient" />
        </div>

        {/* Content */}
        <Provider>
          <main className="app">
            <Navbar />
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
