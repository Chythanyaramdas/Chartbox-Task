import { useDispatch, useSelector } from "react-redux";
// import { userLogin} from "../redux/userSlice";
import { UserApi } from "../utils/User/userApi";
import { useEffect, useState } from "react";
import { userLogins, userLogout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const HomeVerification = ({ children }) => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("userToken");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (function () {
      if (user.id) {
        return setLoading(false);
      } else if (jwtToken) {
        UserApi.get("/token_v")
          .then((response) => {
            if (response.data.user) {
              console.log("----------", response.data.user);
              dispatch(userLogin(response.data.user));
              return setLoading(false);
            } else if (response.status == 401) console.log(response);
          })
          .catch((err) => {
            alert("jjj");
            const expires = localStorage.removeItem("userToken");
            console.log(expires,"forbiden");

            dispatch(userLogout());

            navigate("/login");
          });
      } else {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading) return children;
  else return null;
};
