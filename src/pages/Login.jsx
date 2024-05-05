import React, { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie';
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [_,setCookies]=useCookies(['access_token']);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,username,password,
      });
      setCookies('access_token',res.data.token);
      window.localStorage.setItem('userId',res.data.userId);
      navigate('/');
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-center mt-16 overflow-hidden"
     
    >
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form className="mt-5"  onSubmit={onSubmit}>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={ev => setuserName(ev.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
