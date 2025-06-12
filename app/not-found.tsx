import Plus from "@/components/svg/Plus";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col  h-full items-center justify-center">
      <span className="font-p-2 mb-2 font-semibold opacity-85">Page not found</span>
      <Link href="/" className="cta-2 font-p-2">
        <IconChevronLeft /> Home
      </Link>
    </div>
  );
}

export default NotFound;
