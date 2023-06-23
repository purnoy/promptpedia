"use client"
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.svg";
import { useEffect, useState } from "react";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
        src={Logo}
        alt="Promt Logo"
        height={30}
        width={30}
        className="object-contain"
        />
        <p className="logo_text">Promtpedia</p>
      </Link>

      {/*Mobile Navigation*/}
      <div className="sm:flex hidden">
      {
        isUserLoggedIn?(
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
              src={Logo}
              alt="User"
              height={37}
              width={37}
              className="rounded-full"
              ></Image>
            </Link>
          </div>
        ):
        (
          <>
          
          </>
        )
      }
      </div>
    </nav>
  )
}

export default Nav
