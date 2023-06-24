"use client"
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.svg";
import bogo from "@/public/assets/icons/tick.svg"
import { useEffect, useState 
} from "react";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(()=>{
    const setProv = async()=>{
      const response = await getProviders();
      setProviders(response); 
    }  
    setProv();
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src={Logo} alt="Promt Logo" height={30} width={30} className="object-contain"/>
        <p className="logo_text">Promtpedia</p>
      </Link>

      {/*Desktop Navigation*/}
      <div className="md:flex hidden">
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
              <Image src={Logo} alt="User" height={37} width={37} className="rounded-full"/>
            </Link>
          </div>
        ):
        (
          <>
            {
              providers && Object.values(providers).map(provider=>(
                <button type="button" className="black_btn" onClick={()=>signIn(provider.id)}>
                  Sign In
                </button>
              ))
            }
          </>
        )
      }
      </div>
      {/*Mobile Navigation*/}
      <div className="md:hidden flex relative">
        {
          isUserLoggedIn? (
            <div className="flex">
              <Image src={bogo} alt="User" height={37} width={37} onClick={()=>setToggleDropDown(prev=>(!prev))} className="rounded-full"/>
              {
                toggleDropDown && (
                  <div className="dropdown">
                    <Link href="/profile" className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}>
                      My Profile
                    </Link>
                    <Link href="/create-prompt" className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}>
                      Create Prompt
                    </Link>
                    <button type="button"
                    onClick={()=>{setToggleDropDown(false); signOut();}}
                    className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }

            </div>
            
            
          ):(
            <>
              {
                 providers && Object.values(providers).map(provider=>(
                  <button type="button" className="black_btn" onClick={()=>signIn(provider.id) }>
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
