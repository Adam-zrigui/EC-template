import { useStateContext } from "@/hooks/State"
import { IP } from "@/interfaces"
import { urlfor } from "@/lib/client"
import { getStripe } from "@/lib/getStripe"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from "react-icons/ai"
import {TiDeleteOutline} from 'react-icons/ti'
export default function Cart() {
  
const ref = useRef<HTMLDivElement>(null)
const {price ,total , item , setcard , tciq , onDel} = useStateContext()
async function handle() {
const stripe = await getStripe()
const res = (await axios.post('/api/stripe', {item} )).data
toast.loading('redirecting..')
stripe.redirectToCheckout({sessionId: res.id})
console.log(item)
}
return (
<div className='cart-wrapper' ref={ref}>
<div className="cart-container">
  <button className="cart-heading" onClick={() => setcard(false)}>
    <AiOutlineLeft />
    <span className='heading'>Your cart</span>
    <span className='cart-num-items'>({total})</span>
  </button>
  {item.length < 1 && (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      <h3>click add to cart to show items here</h3>
      <Link href="/">
        <button className="btn" onClick={() => setcard(false)}>
          continue shopping
        </button>
      </Link>
    </div>
  )}
  <div className="product-container">
    {item.length >= 1 && (
      item.map((item : IP ) => (
<div className="product" key={item._id}>
<Image src={urlfor(item?.image[0]).url()} alt="product" className='cart-product-image' width={100} height={100}/>
<div className="item-desc">
  <div className="flex top">
    <h5>{item.name}</h5>
    <h4>${item.price}</h4>
  </div>
<div className="flex bottom">
  <div className="">
  <p className="quantity-desc">
            <span className="minus" onClick={() => tciq(item._id , 'dec')}><AiOutlineMinus /></span>
            <span className="num">{item.quantity}</span>
            <span className="plus" onClick={() => tciq(item._id , 'inc')}><AiOutlinePlus /></span>
          </p>
  </div>
  <button className="remove-item" onClick={() => onDel(item)}>
    <TiDeleteOutline />
  </button>
</div>
</div>
</div>
      ))
    )}
  </div>
  {item.length >= 1 && (
    <div className="cart-bottom">
      <div className="total">
        <h3>subtotal</h3>
        <h3>${price}</h3>
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handle}>
          pay avec stripe
        </button>
      </div>
    </div>
  )}
</div>
    </div>
  )
}
