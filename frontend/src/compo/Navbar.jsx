import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
// Simplified: removed dropdown-menu -- using a simple profile link + logout button
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useSelector((store) => store.auth)
  

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        navigate("/login")
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };




  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow"
          >
            CL
          </motion.div>
          <div>
            <div className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              ContentLab
            </div>
            <div className="text-sm text-gray-500 -mt-1">
              Social Media Analyzer
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              <NavigationMenuItem>
                <Link
                  to="/uploads"
                  className="text-sm text-gray-700 hover:text-primary transition-colors"
                >
                  My Uploads
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/upload"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  New Upload
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Simple profile area */}
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
            >
              <span className="text-sm">{user.fullname}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 md:hidden border-l"
          >
            <div className="p-5 flex flex-col gap-5">
              <Link
                to="/uploads"
                className="text-gray-700 text-sm hover:text-primary transition"
                onClick={() => setMobileOpen(false)}
              >
                My Uploads
              </Link>
              <Link
                to="/uploads/new"
                className="text-primary text-sm font-medium hover:underline"
                onClick={() => setMobileOpen(false)}
              >
                New Upload
              </Link>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-primary transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
