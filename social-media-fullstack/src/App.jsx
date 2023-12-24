
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import "./App.css"
import Navbar from "./Components/Navbar"
import CreatePost from "./pages/create-post/CreatePost"
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/createpost" element={<CreatePost/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
