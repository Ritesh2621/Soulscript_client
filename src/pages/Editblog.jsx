import React, { useState,useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const Editblog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});

  

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/blogs/edit/${id}`, { ...post });
      alert("Blog Updated Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Blog Updation Failed");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`http://localhost:4000/blogs/${id}`);
        setPost(res.data);
        console.log(res.data);
        // toast.success("Blog Updated Successfully");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);

  return (
    <div className="create-recipe">
      <h1 className="text-3xl m-2 font-semibold text-center ">Update Post</h1>
      <form className="flex flex-col items-center p-3" >
        {/* <label htmlFor="tittle">Tittle</label> */}
        <input
          type="text"
          id="tittle"
          name="tittle"
          value={post.tittle}
          onChange={(e) => setPost({ ...post, tittle: e.target.value })}
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"

        />
        {/* <label htmlFor="desc">Description</label> */}
        <textarea
          id="desc"
          name="desc"
          value={post.desc}
          onChange={(e) => setPost({ ...post, desc: e.target.value })}
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="category">Category</label> */}
        <input
          type="text"
          id="category"
          name="category"
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="author">Author</label> */}
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        {/* <label htmlFor="image">Image URL</label> */}
        <input
          type="text"
          id="image"
          name="image"
          value={post.image}
          onChange={(e) => setPost({ ...post, image: e.target.value })}
          className="border-2 border-gray-300 w-[50%] p-2 m-2 rounded-md"
        />
        <div className="flex items-center">
        <button
          className="border-2 border-gray-300 p-2 m-2 rounded-md"
          type="submit"
          onClick={submit}
        >
          Update-Post
        </button>
       
     
        </div>
      
      </form>
    </div>
  );
};

export default Editblog;
