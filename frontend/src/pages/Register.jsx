import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  console.log(userData);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/api/v1/user/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Gradient + Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">ContentLab</h1>
          <p className="text-lg text-indigo-100 max-w-sm mx-auto">
            Empower your creativity — start building smarter, faster, and better today.
          </p>
        </div>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
              Create your ContentLab account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input onChange={changeHandler} id="fullname" type="text" placeholder="John Doe" name="fullname" value={userData.fullname} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={changeHandler} id="email" type="email" placeholder="you@example.com" name="email" value={userData.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input onChange={changeHandler} id="password" type="password" placeholder="••••••••" name="password" value={userData.password} />
              </div>

              <Button type="submit" className="w-full bg-purple-600 cursor-pointer">
                Create account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Register
