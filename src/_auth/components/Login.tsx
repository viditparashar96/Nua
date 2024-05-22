import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("Form Data", formData);
    try {
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      setLoading(true);
      const response = await axiosInstance.post("/user/login", formData);
      console.log("response", response);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className=" w-full h-screen  flex items-center justify-center">
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="m@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                value={formData.password}
                type="password"
                placeholder="********"
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
