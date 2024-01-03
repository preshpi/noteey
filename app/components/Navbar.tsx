"use client";
import { NextPage } from "next";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export interface navbarProps {
  signIn: () => void;
  logOut: () => void;
}
const Navbar: NextPage<navbarProps> = ({ signIn, logOut }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="flex justify-between items-center lg:px-12 px-4 py-5 border-b border-[#E1E1E1] text-[#180202] dark:text-[#effefb]">
      <h1 className="text-2xl cursor-pointer font-bold">Noteey</h1>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {user.displayName && <p>Welcome, {user.displayName}</p>}
            <button
              onClick={logOut}
              className="px-6 py-2 lg:block hidden rounded-lg bg-[#e85444] text-white hover:bg-[#D12600] transition-colors duration-500"
            >
              Logout
            </button>
            <button
              onClick={logOut}
              className="lg:hidden block px-2 py-2 rounded-md bg-[#e85444] hover:bg-[#d44141] text-white transition-colors duration-500"
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={signIn}
              className="px-6 py-2 rounded-lg bg-[#141318] text-slate-50 hover:bg-[#e85444] transition-colors duration-500"
            >
              Get Started
            </button>
            {loading && <div className="spinner"></div>}
          </div>
        )}
      </div>

      {error && <p>An error occurced, please try again. </p>}
    </div>
  );
};

export default Navbar;
