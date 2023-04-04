import { memo, useEffect, useState } from "react";
import { Menu } from "./menu";
import Link from "next/link";

interface props {
  data?: Menu;
  submenu?: any;
  clicked?: any;
  active?: any;
  handleExpand?: any;
  expand?: any;
  navheader?: any;
}
const SidebarNavList: React.FC<props> = (props) => {
  const icon = props.data?.icon && <i className={props.data.icon} />;
  const titlesub = props.data?.title && (
    <p>
      {props.data.title} <i className="right fas fa-angle-left" />
    </p>
  );

  const title = props.data?.title && <p>{props.data.title}</p>;

  const [isMenuExtended, setIsMenuExtended] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  const handleMainMenuAction = () => {
    if (isExpandable) {
      toggleMenu();
      return;
    }
  };
  const toggleMenu = () => {
    setIsMenuExtended(!isMenuExtended);
  };

  useEffect(() => {
    setIsExpandable(
      Boolean(props && props.data?.children && props.data.children.length > 0)
    );
  }, [props]);

  return (
    <>
      {props.data?.navheader && (
        <li className="nav-header">{props.data.title}</li>
      )}

      <li className={`nav-item${isMenuExtended ? " menu-open" : ""}`}>
        {props.data?.children ? (
          <Link
            href={props.data?.path}
            className="nav-link"
            onClick={handleMainMenuAction}
            style={{ cursor: "pointer" }}
          >
            {icon} {titlesub}
          </Link>
        ) : props.data?.navheader !== true ? (
          <Link
            href={props.data?.path || ""}
            className="nav-link"
            onClick={handleMainMenuAction}
            style={{ cursor: "pointer" }}
          >
            {props.submenu === "active" ? (
              <i className="far fa-circle nav-icon" />
            ) : null}
            {icon} {title}
          </Link>
        ) : null}

        {props.data?.children && (
          <ul className="nav nav-treeview">
            {props.data.children &&
              props.data.children.map((submenu: any, i: number) => (
                <SidebarNavList data={submenu} key={i} submenu="active" />
              ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default memo(SidebarNavList);
