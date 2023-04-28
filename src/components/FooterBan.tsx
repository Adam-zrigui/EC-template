import { IB } from '@/interfaces'
import { urlfor } from '@/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FooterBan({b} : {b : IB} ) {
  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{b.discount}</p>
          <p>{b.largeText1}</p>
<p>{b.largeText2}</p>
<p>{b.saleTime}</p>
        </div>
        <div className="right">

          <p>{b.smallText}</p>
          <h3>{b.midText}</h3>

          <p>{b.desc}</p>

          <Link href={`/products/${b.product}`} >
            <button>{b.buttonText}</button>
          </Link>

        </div>
    
         
      </div>
  
    </div>
  )
}
