import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MyOrdersPage from '../pages/MyOrdersPage/MyOrdersPage';
import OrderDetailPage from '../pages/OrderDetailPage/OrderDetailPage';
import OurProductPage from '../pages/OurProductPage/OurProductPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { routePaths } from './routePaths';

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.ourProduct} element={<OurProductPage />} />
        <Route path={routePaths.myOrders} element={<MyOrdersPage />} />
        <Route path={routePaths.myOrderDetail} element={<OrderDetailPage />} />
        <Route path={routePaths.profile} element={<ProfilePage />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route path={routePaths.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
