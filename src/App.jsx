//import FormGroup_TreeTrimmingDocument from './components/FormGroup_TreeTrimmingDocument/FormGroup_TreeTrimmingDocument';
//import Loginpage from './components/Loginpage/Login';
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


// Bring in the GoogleLogin
// component from the library
import { GoogleLogin } from '@react-oauth/google';
function App() {
  return (
      <div className="App">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
      </div>
  );
}



export default App;
