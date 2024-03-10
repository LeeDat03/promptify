import Navbar from "@/components/navbar";
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
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
