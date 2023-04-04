import { LoadingApp } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="sidebar-mini">
        <div id="app" className="sidebar-mini wrapper">
          <Suspense fallback={<LoadingApp />}>
            <Main />
            <NextScript />
          </Suspense>
        </div>
      </body>
    </Html>
  );
}
