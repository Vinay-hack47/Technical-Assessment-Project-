import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/login`, userData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Gradient + Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">ContentLab</h1>
          <p className="text-lg text-blue-100 max-w-sm mx-auto">
            Elevate your workflow — manage and create content with precision and power.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
              Sign in to ContentLab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={changeHandler} id="email" type="email" placeholder="you@example.com" name="email" value={userData.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input onChange={changeHandler} id="password" type="password" placeholder="••••••••" name="password" value={userData.password} />
              </div>

              <Button type="submit" className="w-full bg-blue-600 cursor-pointer">
                Sign in
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-500">
            <p>
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Create one
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login
