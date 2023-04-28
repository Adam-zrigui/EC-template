import { IB } from '@/interfaces'
import { urlfor } from '@/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Banner({FirstB} : {FirstB : IB}) {
  return (
    <div className='hero-banner-container'>
        <div className="">
            <p className='beats-solo'>{FirstB.smallText}</p>
            <h3>{FirstB.midText}</h3>
            <h3>{FirstB.largeText1}</h3>
            <Image src={urlfor(FirstB.image).url()} alt='' className='hero-banner-image' width={200} height={200}  />
            <div className="">
                <Link href={`/product/${FirstB.product}`} >
                    <button>{FirstB.buttonText}</button>
                </Link>
                <div className="desc">
                    <h5>description</h5>
            <p>{FirstB.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
