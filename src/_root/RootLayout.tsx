import Navbar from "@/components/shared/Navbar";
import { DataProvider } from "@/providers/DataProvider";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
interface RootState {
  auth: {
    status: boolean;
  };
}
const RootLayout = () => {
  const isAuth = useSelector((state: RootState) => state.auth.status);
  console.log("is Auth in Root Layout", isAuth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <DataProvider>
            <>
              <Navbar />
              <div className="p-6">
                <Outlet />
              </div>
            </>
          </DataProvider>
        </div>
      )}
    </>
  );
};

export default RootLayout;
