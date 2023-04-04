import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="sidebar-mini">
        <div id="app" className="sidebar-mini wrapper">
          <Suspense fallback={<Skeleton width="100%" height={1000} />}>
            <Main />
            <NextScript />
          </Suspense>
        </div>
      </body>
    </Html>
  );
}
