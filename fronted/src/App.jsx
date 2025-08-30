import {Route, Routes,Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import AdminApp from "./admin/adminApp";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./authSlicer";
import { useEffect } from "react";


function App()
{

  const {isAuthenticated, loading,user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // it checks user already authenticated or not 
  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch]);

  // if we not use this loading then page re-direct to Signup page then back to Homepage 
  // if user authenticated so we use loading spinner page will not re-direct to 
  // Signup you will see spinner till loading
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  // here we are handling routing 
  return (
  <>
     <Routes>
      <Route path="/" element={isAuthenticated ? <Homepage></Homepage> :<Navigate to="/signup"/>}></Route>
      <Route path="/login" element={ isAuthenticated ? <Navigate to="/"/> : <Login></Login>}></Route>
      <Route path="/signup" element={ isAuthenticated ? <Navigate to="/"/>:<Signup></Signup>}></Route>
      <Route path="/admin" element={<AdminApp></AdminApp>}></Route>
     </Routes>
  </>
  )
}

export default App;