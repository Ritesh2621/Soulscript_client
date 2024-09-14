import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import Happy from "../assest/Happy.jpg";

const Detail = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`https://soulscript.onrender.com/blogs/best/${id}`);
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col">
        <div className="lg:w-[100%] md:w-[100%] sm:w-[100%] flex flex-col items-center">
          <div className="xl:w-[85%] lg:w-[85%] md:w-[90%] sm:w-[80%] bg-white flex flex-col items-center mt-10">
            <h2 className="font-serif font-semibold text-3xl text-center m-4">
              {post.tittle}
            </h2>
            <img
              src={post.image}
              alt={post.name}
              className="w-[80%] h-[50%] object-contain mt-3"
            />
            <div className="m-4 lg:w-[620px] md:w-[600px] xl:w-[800px] 2xl:w-[1000px]">
              <p className="text-[17px] w-full m-auto">{post.desc}</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[25%] flex flex-col justify-stretch items-center p-5">
          <div className="w-[93%] h-[400px] bg-white flex flex-col justify-start gap-2 mt-[20px]">
            <img src={post.image} alt={post.tittle} className="h-[280px] w-[75%] object-fill" />
            <p>
              <span className="text-md font-semibold">Category:</span> {post.category && post.category.join(', ')}
            </p>
            <p>
              <span className="text-md font-semibold">Author:</span> {post.author}
            </p>
            <p>
              <span className="text-md font-semibold">Date:</span> {moment(post.date).format("YYYY-MM-DD")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
