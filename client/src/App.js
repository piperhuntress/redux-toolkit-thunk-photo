import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "./features/gallerySlice";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Gallery from "./Components/Gallery";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);
  //console.log(photos);
  return (
    <div className="App">
       <Router>
      <Header></Header>
     
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
