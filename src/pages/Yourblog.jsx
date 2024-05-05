 import React,{useState,useEffect} from 'react'
 import { useGetUserID } from "../hooks/userId.js";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import moment from "moment";
import { MdEdit} from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
 
 const Yourblog = () => {
    const[blog,setBlog] = useState([]);
    const userId = useGetUserID();
    const { id } = useParams();
    const refresh = () => window.location.reload(true)

    const Delete = async(id)=>{
      try{
        await axios.delete(`http://localhost:4000/blogs/${id}`)
        alert('Blog Deleted Successfully')
        refresh();
      }catch(err){
        console.log(err)
        alert('Blog Deletion Failed!')
      }
    
    }

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
      }, []);

   return (
    <div className=" overflow-hidden bg-slate-50  ">
    <ul className="flex flex-wrap justify-evenly mt-[50px] ">
      {blog.map((blog) => (
        <li key={blog._id}>
          <div className="border-slate-50 border-[14px] rounded-3xl bg-white shadow-2xl mb-4  w-[390px] h-[470px] p-2 ">
            <div className="">
              <div className='flex flex-row justify-end'>
              <Link to={`/blogs/edit/${blog._id}`}>
              <MdEdit className='text-xl mr-2 '/>
              </Link>
  
                  <MdDelete onClick={() => Delete(blog._id)} />

              </div>
              <img
                className="h-[225px] w-[325px] m-2 object-fill object-center rounded-2xl"
                src={blog.image}
                alt={blog.name}
              />
              </div>
              <div>
              <h2 className="p-1 font-medium ">{blog.tittle}</h2>
                <p className="w-[300px]">{blog.desc.slice(0,40)}...</p>
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
            <Link to={`/blogs/${blog._id}`}>
              <p className='border text-sm bg-slate-200 text-blue-800 m-2 mb-2 rounded-lg p-[7px] w-[90px] '>Read More</p>
            </Link>
              </div>

          </div>
        </li>
      ))}
    </ul>
    <ToastContainer />
  </div>
   )
 }
 
 export default Yourblog