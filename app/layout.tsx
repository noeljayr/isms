import "@/css/globals.css";
import "@/css/modals.css";
import { Metadata } from "next";

import "@fontsource/lexend/300.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "@fontsource/lexend/700.css";
import "@fontsource/lexend/800.css";
import "@fontsource/lexend/900.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import Sidebar from "@/components/navigation/sidebar/Sidebar";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import SettingsModal from "@/components/modals/settings/SettingsModal";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CodeWave ISMS",
  description:
    "Integrated school managment system by CodeWave Solutions Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="p-2">
        <Suspense>
          <NextTopLoader
            color="#0008cc"
            showSpinner={false}
            height={2}
            crawlSpeed={200}
            easing="ease"
          />
          <Sidebar />
          <SettingsModal />

          <div className="page p-3 pb-0 flex flex-col gap-2 w-full h-full overflow-hidden">
            <div className="top-bar flex items-center justify-between w-full">
              <BreadCrumbs />
              {/* <UserProfile /> */}
            </div>
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
