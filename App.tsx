import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, GoldTicker } from './components/Layout';
import Home from './pages/Home';
import Book from './pages/Book';
import Admin from './pages/Admin';
import { About, Locations, Process, Contact } from './pages/StaticPages';

// Scroll to top wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
        <Navbar />
        <GoldTicker />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/buy" element={<Home />} /> {/* For demo, redirects to Home sections */}
            <Route path="/process" element={<Process />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/faq" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;