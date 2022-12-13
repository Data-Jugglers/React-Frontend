import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { Footer, Header, Navbar } from "./components";
import { N1, N2, N3, About, Custom } from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<N1 />} />
          <Route path="/N3" element={<N3 />} />
          <Route path="/N2" element={<N2 />} />
          <Route path="/About" element={<About />} />
          <Route path="/*" element={<Custom />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
