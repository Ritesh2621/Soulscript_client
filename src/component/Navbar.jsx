import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <>
    <nav className="bg-[#ff3e00]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
            <div className='text-slate-300 text-2xl'>
            SoulScript
      </div>
            </div>
          </div>
          <div className="hidden gap-2 md:flex text-[#6420AA] text-lg font-medium mt-[4px]">
          <Link className='p-2' to="/">Home</Link>
        {!cookies.access_token ? (
          <Link className='p-2' to='/login'>Login</Link>
        ) : (
          <>
        <Link className='p-2' to="/create-blog">Create-Post</Link>
        <Link className='p-2' to="/myblog">My-Blog</Link>
           <button className='p-2 mt-[-16px]' onClick={handleLogout}>Logout</button>
          </>
        )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#ff3e00]">
          <div className="px-2 pt-2 pb-3 text-[#6420AA] space-y-1 sm:px-3">
          <Link className='p-2' to="/">Home</Link>
        {!cookies.access_token ? (
          <Link className='p-2' to='/login'>Login</Link>
        ) : (
          <>
        <Link className='p-2' to="/create-blog">Create-Post</Link>
        <Link className='p-2' to="/myblog">My-Blog</Link>
           <button onClick={handleLogout}>Logout</button>
          </>
        )}
          </div>
        </div>
      )}
    </nav>
    
    </>
   
  )
}

export default Navbar


