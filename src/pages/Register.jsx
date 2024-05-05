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
    const res =  await axios.post("http://localhost:4000/auth/register", {
        email,
        username,
        password,
      });
      console.log(res);
     
      alert("Registration Completed! Now login.");
      if(res.status === !200) {
        alert("Registration Failed");
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-20 pt-6 sm:justify-center sm:pt-0">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Register</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  placeholder="username"
                  value={username}
                  onChange={(ev) => setuserName(ev.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <button className="mt-6 w-full" type="submit">
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
