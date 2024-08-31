import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FoodListing from "./pages/FoodListing";
import SiteHeader from "./components/SiteHeader";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/CartProvider";
import UserProfile from "./pages/UserProfile";
import OrderSuccess from "./pages/OrderSuccess";
import ChangePassword from "./pages/ChangePassword";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  return (
    <div
      className={`App ${
        isSidebarOpen && !shouldHideHeader ? "sidebar-open" : ""
      } ${shouldHideHeader ? "pre-login-pge" : ""}`}
    >
      <div className='site-wrapper'>
        {!hideHeaderRoutes.includes(location.pathname) && (
          <SiteHeader toggleSidebar={toggleSidebar} />
        )}
        <div className='site-inner-wrap'>
          {!hideHeaderRoutes.includes(location.pathname) && (
            <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
          )}
          <main className='main-wrap'>
            <Routes>
              <Route path='/login' Component={Login}></Route>
              <Route path='/register' Component={Register}></Route>
              <Route path='/' Component={Home}></Route>
              <Route
                path='/category/:categoryName'
                Component={FoodListing}
              ></Route>
              {/* <Route
          path='/category/:categoryName'
          element={<ProtectedRoute Component={FoodListing} />}
        ></Route> */}
              <Route
                path='/Profile'
                element={<ProtectedRoute Component={UserProfile} />}
              ></Route>
              <Route
                path='/cart'
                element={<ProtectedRoute Component={Cart} />}
              ></Route>
              <Route
                path='/success'
                element={<ProtectedRoute Component={OrderSuccess} />}
              ></Route>
              <Route
                path='/change-password'
                element={<ProtectedRoute Component={ChangePassword} />}
              ></Route>
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
}

export default AppWrapper;
// export default App;
