import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaUser } from "react-icons/fa";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=6;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records = blog.slice(firstIndex,lastIndex);
  const npage = Math.ceil(blog.length/recordsPerPage);
  const numbers = [...Array(npage+1).keys()].slice(1);

  const prePage = ()=>{
    if(currentPage!==1){
      setCurrentPage((prev)=>prev-1);
    }
  }
 
  const changeCPage = (number)=>{
    setCurrentPage(number);
  }

  const nextPage = ()=>{
    if(currentPage!==npage){
      setCurrentPage((prev)=>prev+1);
    }
  }

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
    <div className=" overflow-hidden bg-slate-50 ">
      <ul className="flex flex-wrap justify-evenly mt-[50px] ">
        {records.map((blog) => (
          <li key={blog._id}>
            <div className="border-slate-50 border-[14px] rounded-3xl bg-white shadow-2xl  w-[390px] h-[430px] p-2 m-2 ">
              <Link to={`/blogs/${blog._id}`}>
              <div className="">
                <img
                  className="h-[225px] w-[325px] m-2 object-fill object-center rounded-2xl"
                  src={blog.image}
                  alt={blog.name}
                />
                </div>
                <div>
                <h2 className="p-1 font-medium ">{blog.tittle}</h2>
                <p className="w-[300px]">{blog.desc.slice(0, 70)}...</p>
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 mt-4">
                <FaUser className="text-xl" />
                <div className="flex flex-col">
                <p className="m-0 p-0 text-sm font-semibold"> {blog.author}</p>
                  <p className="m-0 p-0 text-xs ">{moment(blog.date).format("YYYY-MM-DD ")}</p>
                </div>
                </div>
                  <p className="border mt-6 text-sm bg-slate-200 text-blue-800  rounded-lg p-[5px]"> {blog.category}</p>
                {/* <p className=''> {moment(blog.date).format('h:mm:ss ')}</p> */}
                </div>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center mt-10">
      <ul className="flex gap-2">
      <li>
        <button onClick={prePage} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">Prev</button>
      </li>
        {numbers.map((number)=>(
          <li key={number} onClick={()=>changeCPage(number)} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">{number}</li>
        ))}
        <li>
        <button onClick={nextPage} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">Next</button>
      </li>
        
      </ul>
      </div>
    </div>
  );
};

export default Home;
