import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/components/Login";
import Register from "./_auth/components/Register";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import { axiosInstance } from "./lib/axios";
import { login, logout } from "./lib/store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/user/currentUser");
        console.log("response", response);
        if (response.data) {
          dispatch(login(response.data.user));
        }
      } catch (error) {
        console.log("error", error);
        dispatch(logout()); // To do Fix this

        try {
          const response = await axiosInstance.get("/user/logout");
          console.log("response", response);
          dispatch(logout());
        } catch (error) {
          console.log("error", error);
          dispatch(logout());
        }
      }
    })();
  }, [dispatch, navigation]);

  return (
    <div className="dark ">
      {/* Public */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private */}
        <Route element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
