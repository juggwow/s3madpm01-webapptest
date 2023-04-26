import FormGroup_TreeTrimmingDocument from './components/FormGroup_TreeTrimmingDocument/FormGroup_TreeTrimmingDocument';
import Loginpage from './components/Loginpage/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Navbarweb from './components/Navbar/Navbarweb';
import UserInfo from './components/Loginpage/UserInfo';
import { useState } from 'react';


// Bring in the GoogleLogin
// component from the library

function App() {
  const [isLogin,setIsLogin] = useState(false)
  const [user,setUser] = useState("")
  const [isRegistor,setIsRegistor] = useState(false)
  const [userdata,setUserdata] = useState({userid:"", firstname:"", lastname:"", mobileno:"", karnfaifa:""})
  return (
    //my comment

      <BrowserRouter>
        <Navbarweb isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} userdata={userdata} setUserdata={setUserdata} isRegistor={isRegistor}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/UserInfo' element={isLogin ? <UserInfo isRegistor={isRegistor} setIsRegistor={setIsRegistor} isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} userdata={userdata} setUserdata={setUserdata}/> : <Navigate to="/Login"/>}/>
          <Route path='/Login' element={isLogin ? <Navigate to="/"/>:<Loginpage setIsRegistor={setIsRegistor} setIsLogin={setIsLogin} user={user} setUser={setUser}  setUserdata={setUserdata} />}/>
          <Route path='/Treetrimmingdoc' element={(isLogin&&isRegistor) ? <FormGroup_TreeTrimmingDocument userdata={userdata} user={user} />:<Navigate to="/UserInfo"/>}/>
        </Routes>
        
      </BrowserRouter>
          
      
      
  );
}



export default App;
