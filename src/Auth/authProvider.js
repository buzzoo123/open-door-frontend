import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useMemo, useReducer } from "react";

// Create the authentication context
const AuthContext = createContext();

// Define the possible actions for the authReducer
const ACTIONS = {
  setAuthData: "setAuthData",
  clearAuthData: "clearAuthData",
};

// Reducer function to handle authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setAuthData:
      // Set the authentication token and user in axios headers and local storage
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload.jwtToken;
      localStorage.setItem("jwtToken", action.payload.jwtToken);

      // Extract user information from JWT payload
      const decodedToken = jwtDecode(action.payload.jwtToken); // Assuming you are using a library like jwt_decode
      const user = decodedToken.name; // Change "name" to the actual key in your JWT payload

      // Update the state with the new token and user
      return {
        ...state,
        jwtToken: action.payload.jwtToken,
        user: user,
      };

    case ACTIONS.clearAuthData:
      // Clear the authentication token and user from axios headers and local storage
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwtToken");

      // Update the state by removing the token and user
      return { ...state, jwtToken: null, user: null };

    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );
  }
};

// Initial state for the authentication context
const initialData = {
  jwtToken: localStorage.getItem("jwtToken"),
  user: localStorage.getItem("jwtToken")
    ? jwtDecode(localStorage.getItem("jwtToken")).name
    : null,
};

// AuthProvider component to provide the authentication context to children
export const AuthProvider = ({ children }) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData);

  // Function to set the authentication token and user
  const setAuthData = (newAuthData) => {
    // Dispatch the setAuthData action to update the state
    dispatch({ type: ACTIONS.setAuthData, payload: newAuthData });
  };

  // Function to clear the authentication token and user
  const clearAuthData = () => {
    // Dispatch the clearAuthData action to update the state
    dispatch({ type: ACTIONS.clearAuthData });
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setAuthData,
      clearAuthData,
    }),
    [state]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
