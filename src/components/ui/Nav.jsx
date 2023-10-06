import React, { useState } from "react";
import NavLink from "./NavLink";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserState } from "@/context/userContext";

const Nav = () => {
  const router = useRouter();
  const { user } = UserState();
  const [mobileShow, setMobileShow] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/?search=${event.target.searchQuery.value}`);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear("adminInfo");
    router.push("/login");
    setMobileShow(false);
  };

  const handleMobileShow = () => {
    setMobileShow(true);
  };

  return (
    <nav className="flex justify-between">
      <div className="my-auto w-full md:w-fit flex gap-1">
        <Link
          href="/"
          className="my-auto p-2 text-xl tracking-widest font-semibold hidden md:block"
        >
          AGQuiwag
        </Link>
        <form
          className="flex border w-full border-slate-300 ml-2 md:ml-0"
          onSubmit={handleSearch}
        >
          <AiOutlineSearch className="py-2" size={40} />
          <input
            className="p-2 border-none w-full md:w-72"
            type="text"
            id="searchQuery"
            name="searchQuery"
            placeholder="Search Here"
          />
        </form>
      </div>

      <div
        className={`flex flex-col fixed md:flex-row inset-0 bg-white z-50 duration-300 md:static md:bg-transparent ${
          mobileShow ? "-translate-x-0" : "-translate-x-full md:translate-x-0"
        }  `}
      >
        <div className=" p-2 text-xl tracking-widest md:hidden text-black font-semibold">
          AGQuiwag
        </div>
        <button
          onClick={() => setMobileShow(false)}
          className="absolute right-3 top-3 text-lg font-bold md:hidden"
        >
          <AiOutlineClose size={24} />
        </button>
        <NavLink setMobileShow={setMobileShow} href="/" title="Products" />
        {user && (
          <NavLink
            setMobileShow={setMobileShow}
            href="/add_products"
            title="Add/Edit Products"
          />
        )}
        {!user ? (
          <Link
            href="/login"
            className="bg-red-500 p-4 text-white hover:bg-red-400"
            onClick={() => setMobileShow(false)}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 p-4 text-white hover:bg-red-400"
          >
            Logout
          </button>
        )}
      </div>

      <button onClick={handleMobileShow} className="md:hidden p-3">
        <GiHamburgerMenu size={30} />
      </button>
    </nav>
  );
};

export default Nav;
