import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoues from "./components/ProtectedRoutes";
import RedirectRoute from "./components/RedirectRoute";
import Job from "./components/Job";
import CreateInterview from "./components/CreateInterview";
import VerifyAccount from "./components/VerifyAccount";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RedirectRoute>
          <Login />
        </RedirectRoute>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <RedirectRoute>
          <Signup />
        </RedirectRoute>
      ),
    },
    {
      path: "/jobs",
      element: (
        <ProtectedRoues>
          <Job />
        </ProtectedRoues>
      ),
    },
    {
      path: "/jobs/create-interview",
      element: (
        <ProtectedRoues>
          <CreateInterview />
        </ProtectedRoues>
      ),
    },
    {
      path: "/verify-account",
      element: (
        <RedirectRoute>
          <VerifyAccount />
        </RedirectRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
