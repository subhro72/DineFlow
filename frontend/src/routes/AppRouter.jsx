import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuDetails from "../pages/MenuDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import MenuItems from "../pages/admin/MenuItems";
import AddMenuItem from "../pages/admin/AddMenuItem";
import EditMenuItem from "../pages/admin/EditMenuItem";
import Users from "../pages/admin/Users";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<MenuDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/menu-items" element={<MenuItems />} />
                <Route path="/admin/menu-items/add" element={<AddMenuItem />} />
                <Route path="/admin/menu-items/edit/:id" element={<EditMenuItem />} />
                <Route path="/admin/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;