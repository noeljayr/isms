"use client";

import "@/css/navigation.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Home from "../svg/Home";
import Book from "../svg/Book";
import Users2 from "../svg/Users2";
import Users3 from "../svg/Users3";
import Notification from "../svg/Notification";
import Calendar from "../svg/Calendar";
import Settings from "../svg/Settings";
import { usePathname } from "next/navigation";
import AnnouncementsCounter from "./AnnouncementsCounter";

const links = [
  {
    name: "Home",
    type: "link",
    icon: <Home />,
    href: "/",
    submenu: [],
    hasCounter: false,
  },
  {
    name: "Announcements",
    type: "link",
    icon: <Notification />,
    href: "#",
    submenu: [],
    hasCounter: true,
  },
  {
    name: "Academics",
    type: "submenu",
    icon: <Book />,
    submenu: [
      {
        name: "Subjects",
        href: "/subjects",
      },
      {
        name: "Classes",
        href: "/classes",
      },
    ],
    hasCounter: false,
  },

  {
    name: "Events",
    type: "link",
    icon: <Calendar />,
    href: "/events",
    submenu: [],
    hasCounter: true,
  },
  {
    name: "Students",
    type: "link",
    icon: <Users2 />,
    href: "/students",
    submenu: [],
    hasCounter: false,
  },
  {
    name: "Staff",
    type: "submenu",
    icon: <Users3 />,
    submenu: [
      {
        name: "Teachers",
        href: "/teachers",
      },
      {
        name: "Accountants",
        href: "/accountants",
      },
    ],
    hasCounter: false,
  },

  {
    name: "Settings",
    type: "link",
    icon: <Settings />,
    href: "/settings",
  },
];

function Sidebar() {
  const pathname = usePathname();

  const activeLink = (linkName: string, href: string) => {
    let isActive = false;

   
    pathname.startsWith(href) ? (isActive = true) : (isActive = false);

    if (linkName === "Home") {
      pathname === "/" ? (isActive = true) : (isActive = false);
    }

    return isActive;
  };

  return (
    <div className="sidebar py-3 px-2 flex flex-col gap-2">
      <Link className="flex logo gap-2.5 pl-2 items-center" href="/">
        <Image
          className="h-6 w-6 object-contain"
          src={logo}
          alt="CodeWaves Logo"
        />
        <h4 className="opacity-70">ISMS</h4>
      </Link>

      <div className="links flex flex-col gap-1 mt-2 w-full">
        {links.map((link, index) => {
          if (link.type === "link") {
            return (
              <Link
                key={index}
                className={`flex pl-3 gap-2 link items-center text-sm 
                  ${
                    activeLink(link.name, link.href || "#")
                      ? "opacity-100 active-link"
                      : "opacity-75"
                  } hover:opacity-100`}
                href={link.href || "#"}
              >
                <span className="opacity-50">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
                {link.hasCounter && link.name === "Announcements" && (
                  <AnnouncementsCounter />
                )}
              </Link>
            );
          } else if (link.type === "submenu") {
            return (
              <div key={index} className="flex flex-col submenu py-2 mt-2">
                <div className="flex gap-2 pl-3 link link-label items-center text-sm opacity-75">
                  <span className="opacity-50">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </div>
                <div className="flex flex-col">
                  {link.submenu?.map((subitem, subindex) => (
                    <Link
                      key={subindex}
                      className={`
                        ${
                          activeLink(subitem.name, subitem.href)
                            ? "opacity-100 active-link"
                            : "opacity-75"
                        }
                        hover:opacity-100 font-medium flex items-center pl-3 link`}
                      href={subitem.href}
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar;
