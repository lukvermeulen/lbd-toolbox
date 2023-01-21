import { MantineProvider } from "@mantine/core";
import type { AppType } from "next/app";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { CustomFonts } from "../components/mantine/custom-fonts";
import { AppLayout } from "~/components/layout/app-layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LBD toolbox</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          primaryColor: "dark",
          fontFamily:
            "Jost, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <CustomFonts />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
