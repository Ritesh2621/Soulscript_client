import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sideblogs = () => {
    const [blog, setBlog] = useState([]);
    const refresh = () => window.location.reload(true)
    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const res = await axios.get("http://localhost:4000/blogs");
            setBlog(res.data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchBlogs();
      }, []);

  return (
    <>
         {blog.map((blog) => (
                  <li key={blog._id} className="p-3 mt-2 w-[300px]">
                  <div onClick={refresh}>
                        <Link to={`/blogs/${blog._id}`}  className=" text-sm bg-slate-50 text-black  rounded-lg p-2">{blog.tittle}</Link>
                  </div>
                  </li>
                ))}
    </>
  )
}

export default Sideblogs