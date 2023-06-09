import { IP } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe"
const  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 
  {
    apiVersion: '2022-11-15'
  })
export default async function handler(req: NextApiRequest, res : NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        mode: 'payment',
        line_items: req.body.cartItems.map((item : IP) => {
const img = item.image[0].asset._ref
const real = img.replace('image-', "https://cdn.sanity.io/images/u8lf0ibx/production/").replace('-webp', '.webp')
return {
  price_data: {
    currency:'usd',
    product_data:{
      name: item.name,
      images: [real],

    },
    unit_amount: item.price * 100
  },
adjustable_quantity: {
  enabled: true,
  minimum:1
},
quantity: item.quantity
}    
}),
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1N1oNmDzFn2nyuHSEcEfV3V8' },
          {shipping_rate:'shr_1N1oPWDzFn2nyuHSwzRxLBJa'}
        ],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession)
    } catch (err : any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}