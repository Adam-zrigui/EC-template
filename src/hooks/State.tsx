import { IP } from '@/interfaces';
import React, { useState } from 'react'
import { toast} from "react-hot-toast"
type ContextValue = {
  showCard: boolean;
  item: any;
  price: any;
  total: any;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (p : IP, q : number)  => void;
  setcard: (b : boolean) => void;
  tciq: (id : string , value: 'inc' | 'dec') => void
  onDel: (product : IP) => void;
  setitem: any
  setprice : any
  setT: any
  setqty: any
};
const Context = React.createContext<ContextValue | undefined>(undefined)

export default function State({children} : any) {
  let found : IP
  let index 
  const [showCard, setcard] = useState(false)
  const [item, setitem] = useState<any[]>([])
  const [price, setprice] = useState(0)
  const [total, setT] = useState(0)
  const [qty, setqty] = useState(0)
  const incQty = () => setqty((prev) => prev + 1)
  const decQty = () => setqty((prev) =>{ 
    if(prev - 1 < 1) return 1
    return prev -1 
  })  
const onAdd = (p : IP, q : number)  => {
  const checkmate = item.find((i : IP) => i._id === p._id)
setprice((prev : number) => prev + p.price * q)
  setqty((prev : number) => prev  + q)
    if (checkmate) {
const update = item.map((i : IP) =>{
  if (i._id === p._id) return {
    ...i,
    q: i.quantity + q
  }
})  
setitem(update)

} else {
p.quantity = q
setitem([...item , {...p}])
}
toast.success(`${qty} ${p.name} added to the cart`)

}
const onDel = (product : IP) => {
  found = item.find((i) => i._id === product._id)
  const cart = item.filter((i) => i._id !== product._id)
  setT((prev) => prev - found.price * found.quantity)
  setqty(prev => prev - found.quantity)
  setitem(cart)
}
const tciq = (id : string , value: 'inc' | 'dec') => {
found = item.find((i) => i._id === id)
index = item.findIndex(p => p._id === id)
const cart = item.filter((i) => i._id !== id)
if (value === 'inc' ) {

  setitem([...cart, { ...found, quantity: found.quantity + 1 } ]);
  setT((prevTotalPrice) => prevTotalPrice + found.price)
  setqty(prevTotalQuantities => prevTotalQuantities + 1)
} else if (value === 'dec') {
if (found.quantity > 1) {
  setitem([...cart, { ...found, quantity: found.quantity - 1 } ]);
  setT((prevTotalPrice) => prevTotalPrice - found.price)
  setqty(prevTotalQuantities => prevTotalQuantities - 1)  
}
}
} 
  return (
    <Context.Provider
    value={{
      showCard,
      item,
      price,
      total,
      qty,
      incQty,
      decQty,
      onAdd,
      setcard,
      tciq,
      onDel,
      setitem,
      setprice, 
      setT,
      setqty
    }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};