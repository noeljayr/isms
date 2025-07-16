"use client";

import "@/css/navigation.css";
import Image from "next/image";
import Home from "@/components/svg/Home";
import Book from "@/components/svg/Book";
import Users2 from "@/components/svg/Users2";
import Users3 from "@/components/svg/Users3";
import Notification from "@/components/svg/Notification";
import Settings from "@/components/svg/Settings";
import { usePathname } from "next/navigation";
import {  useState } from "react";
import useSettingsModalStore from "@/context/modals/settings";
import Link from "next/link";
import logo from "@/public/logo.png";
import { useTokenStore } from "@/context/token";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import ChevronDown from "@/components/svg/ChevronDown";

const links = [
  {
    name: "Home",
    type: "link",
    icon: <Home />,
    href: "/",
    submenu: [],
    roles: ["admin", "teacher", "student", "accountant"],
  },
  {
    name: "Announcements",
    type: "link",
    icon: <Notification />,
    href: "#",
    submenu: [],
    roles: ["admin", "student"],
  },
  {
    name: "Academics",
    type: "submenu",
    roles: ["admin", "teacher", "student"],
    icon: <Book />,
    submenu: [
      {
        name: "Subjects",
        href: "/subjects",
        roles: ["admin", "teacher", "student"],
      },
      {
        name: "Classes",
        href: "/classes",
        roles: ["admin", "teacher"],
      },
      {
        name: "Books",
        href: "/books",
        roles: ["admin", "student"],
      },
      { name: "Exams", href: "/exams", roles: ["teacher", "student", "admin"] },

      {
        name: "Grades",
        href: "/grades",
        roles: ["admin", "teacher", "student", ""],
      },
    ],
  },
  {
    name: "Students",
    type: "link",
    icon: <Users2 />,
    href: "/students",
    roles: ["admin", "accountant"],
    submenu: [],
  },
  {
    name: "Staff",
    type: "submenu",
    icon: <Users3 />,
    roles: ["admin"],
    submenu: [
      {
        name: "Teachers",
        href: "/teachers",
        roles: ["admin"],
      },
      {
        name: "Accountants",
        href: "/accountants",
        roles: ["admin"],
      },
    ],
  },

  {
    name: "Settings",
    type: "link",
    icon: <Settings />,
    href: "#settings",
    roles: ["admin", "teacher", "student", "accountant"],
  },
];

function Sidebar() {
  const pathname = usePathname();
  const { setSettingsModalActive } = useSettingsModalStore();
  const [submenuActive, setSubmenuActive] = useState({
    active: false,
    name: "",
  });
  const { role, SchoolName } = useTokenStore();

  const activeLink = (linkName: string, href: string) => {
    let isActive = false;
  
    if (pathname.startsWith(href)) {
      isActive = true;
    } else {
      isActive = false;
    }
  
    if (linkName === "Home") {
      if (pathname === "/") {
        isActive = true;
      } else {
        isActive = false;
      }
    }
  
    return isActive;
  };
  
  

  if (pathname.startsWith("/auth")) {
    return <></>;
  }


  return (
    <motion.div
      layout="position"
      transition={motionTransition}
      suppressHydrationWarning
      className="sidebar py-3 px-2 flex flex-col gap-2"
    >
      <Link className="flex truncate logo gap-2.5 pl-2 items-center" href="/">
        <Image
          className="h-6 w-6 object-contain"
          src={logo}
          alt="CodeWaves Logo"
        />

        <h4 className="opacity-70 truncate">{SchoolName}</h4>
      </Link>

      <motion.div
        layout="position"
        transition={motionTransition}
        className="links flex flex-col gap-1 mt-2 w-full"
      >
        {links.map((link, index) => {
          // Check role-based access
          const isLinkVisible = !link.roles || link.roles.includes(role);

          if (!isLinkVisible) return null;

          if (link.type === "link") {
            return (
              <>
                {link.name == "Settings" ? (
                  <motion.span
                    layout="position"
                    transition={motionTransition}
                    key={index}
                    onClick={setSettingsModalActive}
                    className={`flex pl-3 gap-2 cursor-pointer opacity-75 hover:opacity-100 link items-center text-sm`}
                  >
                    <span className="opacity-50">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </motion.span>
                ) : (
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
                  </Link>
                )}
              </>
            );
          } else if (link.type === "submenu") {
            // Filter submenu items based on role
            const visibleSubmenuItems = link.submenu?.filter(
              (subitem) => !subitem.roles || subitem.roles.includes(role)
            );

            if (!visibleSubmenuItems || visibleSubmenuItems.length === 0)
              return null;

            return (
              <motion.div
                layout
                key={index}
                className={`flex flex-col submenu border-y-[1px]  ${
                  submenuActive.name == link.name && submenuActive.active
                    ? "border-y-[var(--border)] py-2 mt-2"
                    : "border-y-transparent"
                }`}
              >
                <motion.div
                  layout="position"
                  transition={motionTransition}
                  onClick={() => {
                    setSubmenuActive({
                      active: !submenuActive.active,
                      name: link.name,
                    });
                  }}
                  className={`flex cursor-pointer  gap-2 pl-3 link link-label items-center text-sm opacity-75 hover:opacity-100 font-medium`}
                >
                  <span className="opacity-50">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                  <span className="">
                    <ChevronDown />
                  </span>
                </motion.div>
                {submenuActive.active && submenuActive.name == link.name && (
                  <motion.div
                    layout="position"
                    transition={motionTransition}
                    className="flex flex-col"
                  >
                    {visibleSubmenuItems.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        className={`${
                          activeLink(subitem.name, subitem.href)
                            ? "opacity-100 active-link"
                            : "opacity-75"
                        } hover:opacity-100 font-medium flex items-center pl-3 link`}
                        href={subitem.href}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          }

          return null;
        })}
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;
