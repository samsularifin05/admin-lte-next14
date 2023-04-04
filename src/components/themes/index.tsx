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
  addWindowClass,
  calculateWindowSize,
  getItem,
  removeWindowClass,
  useWindowSize
} from "../utils/function";
import { Suspense, lazy, useEffect } from "react";
import { withRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

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
  }, [windowSize, sidebar, setTheme, screen.screenSize, setSizeValue, router]);

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  //   console.log(getItem("userdata").token);

  return (
    <Suspense fallback={<Skeleton width="100%" height={1000} />}>
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
    </Suspense>
  );
};

export default withRouter(Layout);
