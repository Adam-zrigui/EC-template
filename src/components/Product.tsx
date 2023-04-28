import { IP } from '@/interfaces'
import { urlfor } from '@/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Product({product} : {product : IP}) {
  return (
    <div>
<Link href={`/product/${product.slug.current}`} >
  <div className="product-card">
    <Image src={urlfor(product.image && product.image[0]).url()} alt='product image' width={250} height={250} className='product-image'/>
 <p className='product-name'>{product.name}</p>
 <p className='product-price'>${product.price}</p>
  </div>
</Link>
    </div>
  )
}
