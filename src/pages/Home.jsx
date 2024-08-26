import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaUser } from "react-icons/fa";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState(4); // Start with 6 records visible

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

  const loadMore = () => {
    setVisibleRecords((prevVisibleRecords) => prevVisibleRecords + 4);
  };

  return (
    <div className="overflow-hidden mt-[50px]">
      <p className="font-serif text-5xl m-3 ml-24 w-[400px]">
        See what we’ve <span className="text-5xl font-semibold">written lately</span>
      </p>
      <ul className="flex flex-wrap justify-evenly mt-[30px]">
        {blog.slice(0, visibleRecords).map((blog) => (
          <li key={blog._id}>
            <div className="rounded-3xl p-2 m-2">
              <Link to={`/blogs/${blog._id}`}>
                <div className="">
                  <img
                    className="h-[450px] w-[400px] m-2 object-fill object-center rounded-2xl"
                    src={blog.image}
                    alt={blog.name}
                  />
                </div>
                <div className="flex flex-col w-[350px] ml-4">
                  <div className="flex flex-row items-center justify-between">
                    <p className="border text-base bg-slate-50 text-black rounded-full p-2">
                      {blog.category}
                    </p>
                    <div className="flex flex-row items-center">
                      <FaUser className="m-3 font-light" />
                      <div className="flex flex-col">
                        <p className="m-0 p-0 text-sm font-semibold">
                          {blog.author}
                        </p>
                        <p className="m-0 p-0 text-xs">
                          {moment(blog.date).format("YYYY-MM-DD ")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h2 className="p-1 font-bold text-2xl my-1">{blog.tittle}</h2>
                  <p className="w-full p-1 font-serif">
                    {blog.desc.slice(0, 90)}...
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {visibleRecords < blog.length && (
        <div className="flex justify-center items-center mt-[20px]">
          <button
            onClick={loadMore}
            className="border p-4 rounded-3xl bg-slate-50 hover:bg-black hover:text-white text-xl font-sans font-medium cursor-pointer"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
