import Product from '@/components/Product'
import { useStateContext } from '@/hooks/State'
import { IP } from '@/interfaces'
import { client, urlfor } from '@/lib/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import {AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar} from "react-icons/ai"
import ReactStars from 'react-stars'
export default function Slug({product , products} : { product : IP, products: IP[]}) {
console.log(product)
const [index, setIndex] = useState(0);
const { decQty, incQty, qty, onAdd , setcard } = useStateContext();
const { image, name, details, price , rate } = product;
const {status} =useSession()
console.log(image)
const RightNow = () => {
  onAdd(product, qty)
setcard(true)
}
return (
  <div>
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <Image src={urlfor(image && image[index]).url()} className="product-detail-image"   width={300} height={300}   alt="" />
        </div>
        <div className="small-images-container">
          {image?.map((item : any, i : number) => (
            <Image
              key={i}
              src={urlfor(item).url()}
              className={i === index ? 'small-image selected-image' : 'small-image'}
             width={300}
             height={300}
              onMouseEnter={() => setIndex(i)}
              alt=""
            />
          ))}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1>{name}</h1>
        <div className="reviews">
          <div>
<h4>Rate:</h4>
<ReactStars value={rate} size={24} edit={false} />
          </div>
     
        </div>
        <h4>Details: </h4>
        <p>{details}</p>
        <p className="price">${price}</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
          </p>
        </div>
        <div className="buttons">
   {status === "authenticated" ? <>
   <button type="button" className="add-to-cart" onClick={() => onAdd(product , qty)} >Add to Cart</button>
          <button type="button" className="buy-now"  onClick={RightNow}>Buy Now</button></> :    <button type="button" className="add-to-cart" onClick={(e) => {
            e.preventDefault()
            signIn('google')
            }} >Sign in to continue</button> }    
        </div>
      </div>
    </div>

    <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
    </div>
  </div>
)
}
export const getStaticPaths: GetStaticPaths = async () => {
const q = `*[_type == "product"]
{
    slug {
        current
    }
}
`
const products = await client.fetch(q)
const paths = products.map((p : IP) => ({
params:{
    slug:p.slug.current
}
}))
    return {
        paths,
        fallback:'blocking'
    }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string 
  if (!slug) return {notFound: true}
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`
    const pQ = `*[_type == "product"]`
    const product = await  client.fetch(query)
    const products = await  client.fetch(pQ)
   console.log(product)
      return {
        props:{
            products,
            product
        }
          }    
        }