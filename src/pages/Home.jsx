import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaUser } from "react-icons/fa";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState(4); // Start with 4 records visible

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://soulscript.onrender.com/blogs");
        setBlog(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  const loadMore = () => {
    setVisibleRecords((prevVisibleRecords) => prevVisibleRecords + 4);
  };

  return (
    <div className="overflow-hidden mt-12 mb-6 px-4 sm:px-6 lg:px-8">
      <p className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">
        See what we’ve{" "}
        <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          written lately
        </span>
      </p>
      <ul className="flex flex-wrap gap-6 md:gap-8 justify-center">
        {blog.slice(0, visibleRecords).map((blog) => (
          <li key={blog._id} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/blogs/${blog._id}`}>
                <img
                  className="h-60 sm:h-72 lg:h-80 w-full object-cover"
                  src={blog.image}
                  alt={blog.name}
                />
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                    <p className="border text-base bg-slate-50 text-black rounded-full px-3 py-1 mb-2 sm:mb-0">
                      {blog.category}
                    </p>
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-gray-500" />
                      <div className="text-sm">
                        <p className="font-semibold">{blog.author}</p>
                        <p className="text-xs text-gray-500">
                          {moment(blog.date).format("YYYY-MM-DD")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mt-2 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-700">
                    {blog.desc.slice(0, 90)}...
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {visibleRecords < blog.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="border p-3 rounded-lg bg-slate-50 hover:bg-black hover:text-white text-base font-medium cursor-pointer transition duration-300"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
