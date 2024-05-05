import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID,token } from "../hooks/userId.js";

const Createblog = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    tittle: "",
    desc: "",
    image: "",
    category: "",
    author:"",
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/blogs",
        { ...blog },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Blog created successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
       alert("Blog Creation Failed");
    }
  };

  return (
    <div className="create-recipe">
      <h1 className="text-3xl m-2 font-semibold text-center ">Create Post</h1>
      <form className="flex flex-col items-center p-3" onSubmit={handleSubmit}>
      {/* <label htmlFor="tittle">Tittle</label> */}
        <input
          type="text"
          id="tittle"
          name="tittle"
          value={blog.tittle}
          onChange={handleChange}
          placeholder="Tittle"
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="desc">Description</label> */}
        <textarea
          id="desc"
          name="desc"
          value={blog.desc}
          onChange={handleChange}
          placeholder="Description"
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="category">Category</label> */}
        <input
          type="text"
          id="category"
          name="category"
          value={blog.category}
          onChange={handleChange}
          placeholder="Category"
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="author">Author</label> */}
        <input
          type="text"
          id="author"
          name="author"
          value={blog.author}
          onChange={handleChange}
          placeholder="Author"
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="image">Image URL</label> */}
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Image URL"
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
          value={blog.imageUrl}
          onChange={handleChange}
        />
        <button
          className="border-2 border-gray-300 p-2 m-2 rounded-md"
          type="submit"
        >
          Create-Post
        </button>
      </form>
    </div>
  );
};

export default Createblog;
