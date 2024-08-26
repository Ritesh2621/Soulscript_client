import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Createblog from './pages/Createblog.jsx';
import Yourblog from './pages/Yourblog.jsx';
import DetailView from './pages/DetailView.jsx';
import Editblog from './pages/Editblog.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Detail from './pages/Detail.jsx';
import ScrollToTop from './component/ScrollToTop.jsx';

function App() {
  return (
    <Router >
    <ScrollToTop>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/create-blog" element={<Createblog/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/myblog" element={<Yourblog/>} />
        <Route path="/blogs/:id" element={<DetailView/>} />
        <Route path="/blogs/best/:id" element={<Detail/>} />
        <Route path="/blogs/edit/:id" element={<Editblog/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer/>
      </ScrollToTop>
    </Router>
  );
}

export default App;
