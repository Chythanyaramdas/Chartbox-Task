import { userLogins, userLogout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../utils/User/userApi";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children, accessBy }) => {
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessBy === "Authorized") {
          if (user) {
            setLoading(false);
          } else if (jwtToken) {
            const response = await UserApi.get("/token_v");
            if (response.data.status) {
              dispatch(userLogins(response.data.user));
              setLoading(false);
            } else {
              throw new Error("Unauthorized access");
            }
          } else {
            navigate("/login");
          }
        } else if (accessBy === "non-Authorized") {
          if (user) {
            setLoading(false);
          } else if (jwtToken) {
            const response = await UserApi.get("/token_v");
            if (response.data.user) {
              dispatch(userLogins(response.data.user));
              setLoading(false);
            } else {
              throw new Error("Unauthorized access");
            }
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("userToken");
          dispatch(userLogout());
          navigate("/login");
        } else {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [user, jwtToken, accessBy, dispatch, navigate]);

  if (loading) {
    return null;
  }

  if (accessBy === "Authorized" && !user) {
    return null;
  }

  if (accessBy === "non-Authorized" && user) {
    return null;
  }

  return children;
};
