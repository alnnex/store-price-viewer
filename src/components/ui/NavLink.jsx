import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, title, setMobileShow }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`px-4 py-4 relative group`}
      onClick={() => setMobileShow(false)}
    >
      <div
        className={`transition-all absolute h-full top-0  md:w-full bg-red-500 left-0 md:top-full md:bottom-0  ${
          href === pathname ? "md:h-1 w-1" : "md:h-0 w-0"
        } `}
      />
      {title}
      {/* {pathname} */}
    </Link>
  );
};

export default NavLink;
