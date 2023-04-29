import { useStateContext } from "@/hooks/State"
import { IP } from "@/interfaces"
import { urlfor } from "@/lib/client"
import { getStripe } from "@/lib/getStripe"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRef , useState , useEffect } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from "react-icons/ai"
import {TiDeleteOutline} from 'react-icons/ti'
export default function Cart() {
  
  const ref = useRef<HTMLDivElement>(null)
  const {totalPrice ,totalQuantities , cartItems , setShowCart , toggleCartItemQuantity , onRemove} = useStateContext()
async function handle() {
const stripe = await getStripe()
const res = (await axios.post('/api/stripe', {cartItems} )).data
toast.loading('redirecting..')
stripe.redirectToCheckout({sessionId: res.id})
}
return (
  <div className='cart-wrapper' ref={ref}>
  <div className="cart-container">
    <button className="cart-heading" onClick={() => setShowCart(false)}>
      <AiOutlineLeft />
      <span className='heading'>Your cart</span>
      <span className='cart-num-items'>({totalQuantities} item)</span>
    </button>
    {cartItems.length < 1 && (
      <div className="empty-cart">
        <AiOutlineShopping size={150} />
        <h3>click add to cart to show items here</h3>
        <Link href="/">
          <button className="btn" onClick={() => setShowCart(false)}>
            continue shopping
          </button>
        </Link>
      </div>
    )}
    <div className="product-container">
      {cartItems.length >= 1 && (
        cartItems.map((i : IP ) => (
  <div className="product" key={i._id}>
  <Image src={urlfor(i?.image[0]).url()} alt="product" className='cart-product-image' width={100} height={100}/>
  <div className="item-desc">
    <div className="flex top">
      <h5>{i.name}</h5>
      <h4>${i.price}</h4>
    </div>
  <div className="flex bottom">
    <div className="">
    <p className="quantity-desc">
              <span className="minus" onClick={() => toggleCartItemQuantity(i._id , 'dec')}><AiOutlineMinus /></span>
              <span className="num">{i.quantity}</span>
              <span className="plus" onClick={() => toggleCartItemQuantity(i._id , 'inc')}><AiOutlinePlus /></span>
            </p>
    </div>
    <button className="remove-item" onClick={() => onRemove(i)}>
      <TiDeleteOutline />
    </button>
  </div>
  </div>
  </div>
        ))
      )}
    </div>
    {cartItems.length >= 1 && (
      <div className="cart-bottom">
        <div className="totalQuantities">
          <h3>subtotal</h3>
          <h3>${totalPrice}</h3>
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