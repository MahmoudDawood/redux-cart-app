import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContiner';
import Navbar from './components/Navbar';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])
  
  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])
  
  if(isLoading){
    return(
      <div>
        <h2>Cart loading....</h2>
      </div>
    )
  }
  
  return (
    <div className="App">
      <Navbar/>
      <CartContainer/>
    </div>
  );
}

export default App;
