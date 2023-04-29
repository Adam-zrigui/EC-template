import { IB } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function FooterBan({b} : {b : IB} ) {
  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{b.discount}</p>
          <h3>{b.largeText1}</h3>
<h3>{b.largeText2}</h3>
<p>{b.saleTime}</p>
        </div>
        <div className="right">

          <p>{b.smallText}</p>
          <h3>{b.midText}</h3>

          <p>{b.desc}</p>

          <Link href={`/product/${b.product}`}  className='btnm'>
            <button>{b.buttonText}</button>
          </Link>

        </div>

         
      </div>
  
    </div>
  )
}
