import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Auth/authProvider";
import { ProtectedRoutes } from "./ProtectedRoutes";
import SignInSide from "../Layouts/SignInSide";

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoutes />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/opendoor",
          element: <div>OpeningDoor</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <SignInSide />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
