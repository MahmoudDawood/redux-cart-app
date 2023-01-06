import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../features/cart/cartSlice"
import CartItem from './CartItem'

const CartContainer = () => {
  const dispatch = useDispatch()
  const {cartItems, total, amount} = useSelector(store => store.cart)
  
  if(amount < 1){
    return (
      <section>
        <h2>Your Cart</h2>
        <h3>Is Empty</h3>
      </section>
    )
  }
  return(
    <div className="container">
      <section id="cart">
        <h2>Your Cart</h2>
        <div>
          <p>You've {amount} item{amount > 1 ? 's': ''} in cart.</p>  
          {
            cartItems.map(item => {
              return <CartItem key={item.id} {...item}/>
            })
          }
        </div>
      </section>
      
      <footer id="site-footer">
        <div className="container clearfix">
    
          <div className="left">
            <h2 className="subtotal">You've selected<span> {amount} </span>
              item{amount > 1 ? "s" : ""}
            </h2>
          </div>
    
          <div className="right">
            <h1 className="total">Total: <span>${total.toFixed(2)}</span>€</h1>
            <button className="btn" onClick={() => dispatch(clearCart())}>Checkout</button>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default CartContainer