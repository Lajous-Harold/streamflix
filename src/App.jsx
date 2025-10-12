import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import SearchResults from "./pages/SearchResults.jsx";

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main id='main-content' className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/search' element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
