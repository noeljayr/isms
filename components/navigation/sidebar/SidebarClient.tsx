"use client";

import "@/css/navigation.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Home from "@/components/svg/Home";
import Book from "@/components/svg/Book";
import Users2 from "@/components/svg/Users2";
import Users3 from "@/components/svg/Users3";
import Notification from "@/components/svg/Notification";
import Settings from "@/components/svg/Settings";
import { usePathname } from "next/navigation";
import useSettingsModalStore from "@/context/modals/settings";
import SettingsModal from "@/components/modals/settings/SettingsModal";
import Clipboard from "@/components/svg/Clipboard";
import { useEffect, useState } from "react";

interface SidebarClientProps {
  userRole: string;
  schoolName: string;
}

const links = [
  {
    name: "Home",
    type: "link",
    icon: <Home />,
    href: "/",
    roles: ["admin", "teacher", "student", "accountant"],
  },
  {
    name: "Announcements",
    type: "link",
    icon: <Notification />,
    href: "#",
    roles: ["admin", "student"],
  },
  {
    name: "Academics",
    type: "submenu",
    icon: <Book />,
    roles: ["admin", "teacher", "student"],
    submenu: [
      {
        name: "Subjects",
        href: "/subjects",
        roles: ["admin", "teacher", "student"],
      },
      { name: "Classes", href: "/classes", roles: ["admin"] },
      { name: "Books", href: "/books", roles: ["librarian", "student"] },
      { name: "Exams", href: "/exams", roles: ["teacher", "student", "admin"] },
      {
        name: "Grades",
        href: "/grades",
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    name: "Students",
    type: "link",
    icon: <Users2 />,
    href: "/students",
    roles: ["admin", "accountant"],
  },
  {
    name: "Fees",
    type: "link",
    icon: <Clipboard />,
    href: "/fees",
    roles: ["admin", "student", "accountant"],
  },
  {
    name: "Staff",
    type: "submenu",
    icon: <Users3 />,
    roles: ["admin"],
    submenu: [
      { name: "Teachers", href: "/teachers", roles: ["admin"] },
      { name: "Accountants", href: "/accountants", roles: ["admin"] },
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

export default function SidebarClient({
  userRole,
  schoolName,
}: SidebarClientProps) {
  const pathname = usePathname();
  const { setSettingsModalActive } = useSettingsModalStore();

  const [role, setRole] = useState(userRole);

  useEffect(() => {
    setRole(role);
  }, [role]);

  // Determine if a link is active
  const activeLink = (href: string, name: string) => {
    if (name === "Home") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Hide sidebar on auth pages
  if (pathname.startsWith("/auth")) return null;

  return (
    <div className="sidebar pb-3 px-2 flex flex-col gap-2">
      <Link
        href="/"
        className="grid w-full grid-cols-[auto_1fr] items-center gap-2.5 pl-2 logo"
      >
        <Image src={logo} alt="Logo" className="h-6 w-fit object-contain" />
        <span className="w-full flex truncate">
          <h4 className="opacity-70 font-p-2 truncate">{schoolName}</h4>
        </span>
      </Link>

      <nav className="links flex flex-col gap-1 mt-2 w-full h-full">
        {links.map((link, idx) => {
          if (!link.roles.includes(role)) return null;

          if (link.type === "link") {
            if (link.name === "Settings") {
              return (
                <span
                  key={idx}
                  onClick={setSettingsModalActive}
                  className={`link flex pl-3 gap-2 cursor-pointer items-center text-sm hover:opacity-100 ${
                    activeLink(link.href!, link.name)
                      ? "opacity-100 active-link"
                      : "opacity-75"
                  }`}
                >
                  <span className="opacity-50">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </span>
              );
            }
            return (
              <Link
                key={idx}
                href={link.href!}
                className={`link flex pl-3 gap-2 items-center text-sm hover:opacity-100 ${
                  activeLink(link.href!, link.name)
                    ? "opacity-100 active-link"
                    : "opacity-75"
                }`}
              >
                <span className="opacity-50">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          }

          // Submenu
          const submenuItems = link.submenu?.filter((s) =>
            s.roles.includes(role)
          );
          if (!submenuItems || submenuItems.length === 0) return null;

          return (
            <div key={idx} className="flex flex-col submenu py-2">
              <div className="flex gap-4 pl-3 items-center my-2 text-sm opacity-75 link-label">
                <span className="opacity-50">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </div>
              <div className="flex flex-col">
                {submenuItems.map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className={`pl-3 link gap-2 py-2 flex items-center text-sm font-medium hover:opacity-100 ${
                      activeLink(s.href, s.name)
                        ? "opacity-100 active-link"
                        : "opacity-75"
                    }`}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <SettingsModal />
    </div>
  );
}
