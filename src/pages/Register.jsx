import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/register", {
        email,
        username,
        password,
      });
      console.log(res);

      alert("Registration Completed! Now login.");
      if (res.status !== 200) {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-[50px] flex flex-col items-center justify-center space-y-6 md:space-y-0 md:flex-row md:justify-around">
      <div className="h-auto w-full max-w-md p-3 flex flex-col items-start justify-center">
        <p className="text-4xl md:text-7xl font-serif">Welcome To SoulScript</p>
        <p className="text-lg ml-40 md:text-2xl font-thin mt-4 text-center">
          - "Stories That Connect, Insights That Inspire"
        </p>
      </div>
      <div className="relative w-full max-w-md h-auto flex flex-col items-center justify-center shadow-2xl overflow-hidden p-4 bg-white md:w-96 md:h-[500px]">
        <div>
          <a href="/">
            <h3 className="text-3xl md:text-4xl font-thin">Register</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 bg-white rounded-lg">
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={username}
                  onChange={(ev) => setuserName(ev.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>

            <button className="mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-white hover:text-black focus:outline-none" type="submit">
              Register
            </button>
            <div className="flex items-center justify-end mt-4 text-sm text-gray-600 underline hover:text-gray-900">
              Already registered?
              <Link to="/login">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  LogIn
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
