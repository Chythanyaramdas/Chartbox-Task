import React, { useState } from "react";
import { userLogins } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/User/userApi";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setuseremail] = useState("");
  const [password, setuserpass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await UserApi.post(`/userLogin`, { email, password }).then((response) => {
        const { name, _id, email } = response.data.user;
        dispatch(userLogins({ name, _id, email }));
        navigate("/");
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
      });
    } catch (error) {
      alert("User Blocked");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-login-signup bg-cover overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center text-center w-full max-w-md shadow-lg py-5 px-4 bg-slate-100"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            placeholder="Your email"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            onChange={(e) => setuseremail(e.target.value)}
            placeholder="name@flowbite.com"
            style={{ color: "black" }}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            onChange={(e) => setuserpass(e.target.value)}
            style={{ color: "black" }}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <div className="mt-4 text-gray-700 text-sm">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
          <p>
            <strong>Demo Email:</strong> cchythanyaramdas@gmail.com <br />
            <strong>Password:</strong> Chy123
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
