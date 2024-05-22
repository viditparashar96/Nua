import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
  auth: {
    status: boolean;
  };
}

const AuthLayout = () => {
  const isAuth = useSelector((state: RootState) => state.auth.status);
  console.log("is Auth in Auth Layout", isAuth);
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="w-full">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
