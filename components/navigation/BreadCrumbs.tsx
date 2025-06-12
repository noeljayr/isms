"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import logo from "@/public/logo.png";
import Home from "../svg/Home";
import Book from "../svg/Book";
import Users from "../svg/Users";
import Users2 from "../svg/Users2";
import Users3 from "../svg/Users3";
import Notification from "../svg/Notification";
import Calendar from "../svg/Calendar";
import Settings from "../svg/Settings";
import ArrowLeft from "../svg/ArrowLeft";
import ChevronRight from "../svg/ChevronRight";
import UserGuard from "../svg/UserGuard";

function BreadCrumbs() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return <></>;
  }

  return (
    <div className="bread-crumbs opacity-75 flex items-center gap-2">
      <span
        onClick={() => {
          history.back();
        }}
        className={` cursor-pointer ${
          pathname === "/" ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <ArrowLeft />
      </span>
      <span className="opacity-10 seperator">|</span>
      <Link href="/" className="flex items-center gap-2">
        <Home />
        Home
      </Link>

      {pathname === "/subjects" && (
        <>
          <ChevronRight />
          <Link href="/subjects" className="flex items-center gap-1">
            <Book />
            Subjects
          </Link>
        </>
      )}

      {pathname === "/classes" && (
        <>
          <ChevronRight />
          <Link href="/classes" className="flex items-center gap-1">
            <Users2 />
            Classes
          </Link>
        </>
      )}

      {pathname === "/students" || pathname === "/students/" ? (
        <>
          <ChevronRight />
          <Link href="/students" className="flex items-center gap-1">
            <Users2 />
            Students
          </Link>
        </>
      ) : (
        <></>
      )}

      {pathname === "/students/guardians" ||
      pathname === "/students/guardians" ? (
        <>
          <ChevronRight />
          <Link href="/students" className="flex items-center gap-1">
            <Users2 />
            Students
          </Link>

          <ChevronRight />
          <Link href="/students" className="flex items-center gap-1">
            <UserGuard />
            Guardians
          </Link>
        </>
      ) : (
        <></>
      )}

      {pathname.startsWith("/teachers") ? (
        <>
          <ChevronRight />
          <Link href="/teachers" className="flex items-center gap-1">
            <Users3 />
            Teachers
          </Link>
        </>
      ) : (
        <></>
      )}

      {pathname.startsWith("/accountants") ? (
        <>
          <ChevronRight />
          <Link href="/accountants" className="flex items-center gap-1">
            <Users3 />
            Accountants
          </Link>
        </>
      ) : (
        <></>
      )}

      {pathname.startsWith("/events") ? (
        <>
          <ChevronRight />
          <Link href="/events" className="flex items-center gap-1">
            <Calendar />
            Events
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BreadCrumbs;
