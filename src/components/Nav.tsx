import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import {AiOutlineShopping} from "react-icons/ai"
import Cart from './Cart'
import { useStateContext } from '@/hooks/State'
export default function Nav() {
  const {status} = useSession()
  const {showCard , setcard , qty} = useStateContext()
  return (
    <nav className='navbar-container'>
  <p className="logo">
    <Link href='/'>ADZRS</Link>
    {status === "unauthenticated" ? <b onClick={(e) =>{ 
      e.preventDefault()
      signIn('google')
      }}>sign in</b> : <b onClick={(e) => {
     e.preventDefault()
        signOut()
      
    }}>sign out</b>}
  </p>
{status === "authenticated" &&  <button className="cart-icon" onClick={() => setcard(true)}>
  
      <AiOutlineShopping />
      <span className="cart-item-qty">{qty}</span>


    
  </button>}
{showCard &&  <Cart /> }
    </nav>
  )
}
