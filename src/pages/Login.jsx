import React, { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        username,
        password,
      });
      setCookies('access_token', res.data.token);
      window.localStorage.setItem('userId', res.data.userId);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-[50px] flex flex-col items-center justify-center space-y-6 md:space-y-0 md:flex-row md:justify-around">
      <div className="h-auto w-full max-w-md p-3 flex flex-col items-start justify-center">
        <p className="text-4xl md:text-7xl font-serif">
          Welcome To SoulScript
        </p>
        <p className="text-lg ml-40 md:text-2xl font-thin mt-4 text-center">
          - "Stories That Connect, Insights That Inspire"
        </p>
      </div>

      <div className="relative w-full max-w-md h-auto flex flex-col items-center justify-center shadow-2xl overflow-hidden p-4 bg-white md:w-96 md:h-[500px]">
        <div className="relative w-full px-6 py-4 mt-6 bg-white rounded-lg">
          <h1 className="text-2xl md:text-3xl font-thin text-center mb-6">
            Sign In
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={ev => setUserName(ev.target.value)}
                className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <button className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-white hover:text-black focus:outline-none">
              Login
            </button>
          </form>
          <p className="mt-6 text-md font-light text-center text-gray-700">
            Don't have an account? 
            <Link to="/register" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
