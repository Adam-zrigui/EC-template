import { useStateContext } from '@/hooks/State'
import animation from '@/utils/animation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {BsBagCheckFill} from "react-icons/bs"
export default function Success() {
const {setCartItems , setTotalPrice  , setTotalQuantities} = useStateContext()
useEffect(() => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    animation()
    
}, [setCartItems, setTotalPrice, setTotalQuantities]) 
return (
    <section className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>thank you for your order!</h2>
<p className="email-msg">
    check your email inbox
</p>
<p className="description">
    if you have any questions don&apos;t ask here
    <a href="mailto:order@gmail.com">
        order@gmail.com
    </a>
</p>
<Link href='/' >
    <button className='btn'>
continue shopping
    </button>
</Link>
        </div>
    </section>
  )
}
