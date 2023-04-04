import {
  RecoilEnv,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const Footer = lazy(() => import("./footer"));
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import("./sidebar"));

import { themesSetting } from "@/recoil";
import { screenSize, toggleSidebarMenu } from "../utils";
import {
  LoadingApp,
  addWindowClass,
  calculateWindowSize,
  getItem,
  removeWindowClass,
  useWindowSize
} from "../utils/function";
import { Suspense, lazy, useEffect, useState } from "react";
import { withRouter } from "next/router";

const Layout = ({ children, router }: any) => {
  const theme = useRecoilValue(themesSetting);
  const screen = useRecoilValue(screenSize);
  const sidebar = useRecoilValue(toggleSidebarMenu);
  const setSizeValue = useSetRecoilState(screenSize);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };

  const windowSize = useWindowSize();
  const setTheme = useSetRecoilState(themesSetting);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (getItem("userdata").token === undefined) {
      router.push("/login");
    }
    removeWindowClass("sidebar-closed");
    removeWindowClass("sidebar-collapse");
    removeWindowClass("sidebar-open");

    const size = calculateWindowSize(windowSize.width);
    if (screen.screenSize !== size) {
      setSizeValue({ screenSize: size });
    }

    if (sidebar.menuSidebarCollapsed && screen.screenSize === "lg") {
      addWindowClass("sidebar-collapse");
    } else if (sidebar.menuSidebarCollapsed && screen.screenSize === "xs") {
      addWindowClass("sidebar-open");
    } else if (!sidebar.menuSidebarCollapsed && screen.screenSize !== "lg") {
      addWindowClass("sidebar-closed");
      addWindowClass("sidebar-collapse");
    }

    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [windowSize, sidebar, setTheme, screen.screenSize, setSizeValue, router]);

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <Suspense fallback={<LoadingApp />}>
      <div className="wrapper">
        {theme.header && <Header />}
        {theme.sidebar && <Sidebar />}
        {theme.content && children}
        {theme.footer && <Footer />}

        <div
          id="sidebar-overlay"
          role="presentation"
          onClick={handleToggleMenuSidebar}
          onKeyDown={() => {}}
        />
      </div>
      {loading && <LoadingApp />}
    </Suspense>
  );
};

export default withRouter(Layout);
