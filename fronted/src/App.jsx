import {Route, Routes,Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./authSlicer";
import { useEffect } from "react";


function App()
{

  const {isAuthenticated, loading,user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  return (
  <>
     <Routes>
      <Route path="/" element={isAuthenticated ? <Homepage></Homepage> :<Navigate to="/signup"/>}></Route>
      <Route path="/login" element={ isAuthenticated ? <Navigate to="/"/> : <Login></Login>}></Route>
      <Route path="/signup" element={ isAuthenticated ? <Navigate to="/"/>:<Signup></Signup>}></Route>
     </Routes>
  </>
  )
}

export default App;