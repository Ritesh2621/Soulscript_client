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
                  <li key={blog._id} className="p-2 mt-2">
                  <div onClick={refresh}>
                        <Link to={`/blogs/${blog._id}`}  className="border text-sm bg-slate-200 text-blue-800  rounded-lg p-[5px]">{blog.tittle}</Link>
                  </div>
                  </li>
                ))}
    </>
  )
}

export default Sideblogs