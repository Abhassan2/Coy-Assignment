import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import Navbar from "./components/Navbar.jsx";
import Matches from "./pages/Matches.jsx";
import Swipe from "./pages/Swipe.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} >
            <Route index element={<Navigate to="swipes" replace />} />
            <Route path="/discover/swipes" element={<Swipe />} />
            <Route path="/discover/matches" element={<Matches />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
