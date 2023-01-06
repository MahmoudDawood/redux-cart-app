import { useDispatch } from "react-redux"
import { decrease, increase, removeItem } from "../features/cart/cartSlice"

const CartItem = ({id, image, title, price, amount, description}) => {
  const dispatch = useDispatch()
  return (
    <article className="product">
      <header>
        <button className="remove" onClick={() => dispatch(removeItem({id}))}>
        <img src={image} alt={title}/>
        <h3>Remove product</h3>
        </button>
      </header>
      
      <h1>{title}</h1>
      {description}
        
      <footer className="content">
        <span className="qt-minus" onClick={() => {
          if(amount === 1) dispatch(removeItem({id}))
          else dispatch(decrease({id}))
        }}>-</span>
        <span className="qt">{amount}</span>
        <span className="qt-plus" onClick={() => dispatch(increase({id}))}>+</span>

        <h2 className="full-price">
          {price * amount}€
        </h2>

        <h2 className="price">
          {price}€
        </h2>
      </footer>
    </article>
  )
}

export default CartItem