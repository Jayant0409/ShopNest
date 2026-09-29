import {BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/Ordersuccess';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import AdminOrders from './admin/AdminOrders';
import AdminProducts from './admin/AdminProducts';
import AdminUsers from './admin/AdminUsers';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import AdminDashboard from './admin/AdminDashboard';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {

return ( 
  <>
     <Router>
      <Navbar/>
       <div >
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path= "/Register"  element = {<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/profile" element={<Profile />} />
         <Route path="/product/:id" element={<ProductDetail />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/ordersuccess" element={<OrderSuccess />} />
         <Route path="/shop" element={<Shop/>} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path = "/admin" element = {<AdminDashboard/>} />
          <Route path = "/forgot-password" element = {<ForgotPassword/>} />
          <Route path = "/reset-password" element = {<ResetPassword />} />
        </Routes>
       </div>
      <Footer/>
     </Router>
  </>

)

}

export default App
