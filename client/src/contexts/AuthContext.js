import { createContext, useReducer, useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { authReducer } from "../reducers/authReducer";
import authService from "../services/authService";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    const response = await authService.checkAuth();
    if (response.success) {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: true, user: response.user },
      });
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    const response = await authService.login(userForm);
    if (response.success) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken);
      await loadUser();
    }
    return response;
  };

  // Register
  const registerUser = async (userForm) => {
    const response = await authService.register(userForm);
    if (response.success) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken);
      await loadUser();
    }
    return response;
  };

  //Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // context data
  const authContextData = { loginUser, authState, registerUser, logoutUser };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
