import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Auth/authProvider";
import { ProtectedRoutes } from "./ProtectedRoutes";
import SignInSide from "../Layouts/SignInSide";
import OpenDoor from "../Layouts/OpenDoor";

const Routes = () => {
  const { jwtToken } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoutes />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/opendoor",
          element: <OpenDoor />,
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
    ...(!jwtToken ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
