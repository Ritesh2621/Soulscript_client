import React, { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/userId.js";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Yourblog = () => {
  const [blog, setBlog] = useState([]);
  const userId = useGetUserID();
  const refresh = () => window.location.reload(true);

  const Delete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/blogs/${id}`);
        alert("Blog Deleted Successfully");
        refresh();
      } catch (err) {
        console.log(err);
        alert("Blog Deletion Failed!");
      }
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/blogs/myblog/${userId}`
        );
        setBlog(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, [userId]);

  return (
    <div className="overflow-hidden mt-10 px-4 sm:px-6 lg:px-8">
      <ul className="flex flex-wrap gap-6 justify-center">
        {blog.map((blog) => (
          <li key={blog._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="border border-gray-300 bg-white mb-6 p-4 rounded-lg">
              <div className="flex justify-end mb-2">
                <Link to={`/blogs/edit/${blog._id}`}>
                  <MdEdit className="text-xl mr-2 text-gray-600 hover:text-blue-600" />
                </Link>
                <MdDelete className="text-xl text-red-600 hover:text-red-800" onClick={() => Delete(blog._id)} />
              </div>
              <img
                className="w-full h-64 object-cover rounded-lg mb-2"
                src={blog.image}
                alt={blog.name}
              />
              <div>
                <h2 className="text-lg font-semibold mb-2">{blog.tittle}</h2>
                <p className="text-sm mb-2">{blog.desc.slice(0, 80)}...</p>
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-2">
                  <div className="flex items-center mb-2 md:mb-0">
                    <FaUser className="text-xl mr-2" />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{blog.author}</p>
                      <p className="text-xs text-gray-500">{moment(blog.date).format("YYYY-MM-DD")}</p>
                    </div>
                  </div>
                  <p className="bg-black text-white text-sm rounded-lg py-1 px-2">
                    {blog.category}
                  </p>
                </div>
                <Link to={`/blogs/${blog._id}`}>
                  <p className="border text-sm bg-gray-100 text-black rounded-lg py-1 px-3 text-center">
                    Read More
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Yourblog;
