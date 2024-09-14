import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Home";

const LandingPage = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://soulscript.onrender.com/blogs/best");
        // Use a Set to ensure uniqueness by blog ID
        const uniqueBlogs = Array.from(
          new Set(res.data.map((b) => b._id))
        ).map((id) => {
          return res.data.find((b) => b._id === id);
        });
        setBlog(uniqueBlogs);
        console.log(uniqueBlogs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="overflow-hidden mt-[50px] px-4">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-4xl md:text-5xl lg:text-7xl mb-4">
            <span className="text-[#151619] font-semibold">Welcome To SoulScript.</span> See our thoughts, stories and ideas.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center mt-8">
            <Link to='/login' className="border text-lg font-thin bg-neutral-900 text-white hover:bg-white hover:text-black rounded-full m-2 p-4">
              Join Now
            </Link>
            <p className="text-lg md:text-xl mt-4 md:mt-0 w-full md:w-[400px] font-thin">
              Get the email newsletter and unlock access to members-only content and updates
            </p>
          </div>
          <p className="text-lg md:text-xl mt-[50px] mb-4">Get started with our <span className="text-xl md:text-2xl font-semibold">best stories</span></p>
          <Slider {...settings}>
            {blog.map((blog) => (
              <div key={blog._id} className="p-2">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
                  <Link to={`/blogs/best/${blog._id}`}>
                    <img
                      className="w-full h-[300px] md:h-[425px] object-cover rounded-t-3xl"
                      src={blog.image}
                      alt={blog.name}
                    />
                    <div className="p-4">
                      <div className="flex flex-wrap mb-2">
                        {blog.category.map((cat, index) => (
                          <p
                            key={index}
                            className="border text-xs md:text-base bg-slate-50 text-black rounded-full m-1 p-2"
                          >
                            {cat}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center mb-2">
                        <FaUser className="text-lg md:text-xl mr-2" />
                        <div>
                          <p className="text-sm font-semibold">{blog.author}</p>
                          <p className="text-xs">{moment(blog.date).format("YYYY-MM-DD")}</p>
                        </div>
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold mb-2">{blog.tittle}</h2>
                      <p className="text-sm">{blog.desc.slice(0, 90)}...</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
          <Home />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
