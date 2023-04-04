// }

import dynamic from "next/dynamic";
// const Layout = dynamic(() => import("@/components/themes"));
import "@/styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

const Layout = dynamic(() => import("@/components/themes"), {
  suspense: true
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Admin Template</title>
        </Head>

        <Suspense fallback={<Skeleton width="100%" height={1000} />}>
          <Component {...pageProps} />
        </Suspense>
      </Layout>
    </RecoilRoot>
  );
}
