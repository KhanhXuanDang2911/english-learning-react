import GlobalLoading from "./components/GlobalLoading";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AuthProvider from "./context/AuthContext/auth.context";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <GlobalLoading />
          <AppRoutes />
          <ToastContainer
            toastClassName="text-[14px]"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ScrollToTopButton />
        </GoogleOAuthProvider>
      </AuthProvider>
    </>
  );
}

export default App;
