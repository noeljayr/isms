"use client";

import Check from "@/components/svg/Check";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="card table-card w-full mb-3 h-full">
      <div className="card-title">
        <div className="checkboxes flex items-center gap-3">
          <Link
            href="/students"
            className={`checkbox-container ${
              pathname === "/students" ? "checked" : ""
            }`}
          >
            <span className="checkbox">
              <Check />
            </span>
            <span className="checkbox-label">Students</span>
            <span className="counter number">1,345</span>
          </Link>

          <span className="opacity-10">|</span>
          <Link
            href="/students/guardians/"
            className={`checkbox-container ${
              pathname === "/students/guardians" ? "checked" : ""
            }`}
          >
            <span className="checkbox">
              <Check />
            </span>
            <span className="checkbox-label">Guardians</span>
            <span className="counter number">821</span>
          </Link>
        </div>
      </div>
      <div className="card-body w-full h-full">{children}</div>
    </div>
  );
}
