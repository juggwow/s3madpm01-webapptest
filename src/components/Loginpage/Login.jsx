import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import { useState,useEffect } from 'react';
import { doc, getDoc, collection, setDoc,addDoc } from "firebase/firestore";
import {db} from './firebase' //เข้าถึง db ในโปรเจ็คที่สร้างไว้

function Loginpage(){

    const clientid = "625444603857-8o2ak16p0525kbcgb6ff5oq1fjrasfk1.apps.googleusercontent.com"
    const [user,setUser] = useState("")
    const [userdata,setUserdata] = useState({})
    const [isLogin,setIsLogin] = useState(false)

    useEffect(()=>{
        const initClient = () => {
        gapi.client.init({
            clientid,
            scope: ''
        })
        }
        gapi.load("client:auth2", initClient)
    },[])

    const onSuccess = async (res) => {
        const useremail = res.profileObj.email
        setUser(useremail)
        setIsLogin(true)
        console.log("success",user)
    
      //   //เพิ่ม data ไปยัง firestore
      //   const dbRef = collection(db, "userofs3madpm01");
      //   const data = {
      //     userid: "501855",
      //     firstname: "พัฒนะ",
      //     lastname: "ศุภไชยมงคล",
      //     mobileno: "0883874774",
      //     karnfaifa: "อื่นๆ"
      //  };
      //   await setDoc(doc(dbRef,useremail), data); //doc(collection ของ firestore,ชื่อ document)
    
        const docRef = doc(db,"userofs3madpm01",useremail)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          console.log(docSnap.data())
          setUserdata(docSnap.data())
        }
        else{
          console.log("No such document!");
        }
    
    
      }
    
    const onFailure = (res) => {
        console.log("fail",res)
    }

    return(
        <GoogleLogin clientId={clientid} 
                      buttonText="เข้าสู่ระบบด้วย Gmail"
                      onSuccess={onSuccess} 
                      onFailure={onFailure}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}/>
    )
}

export default Loginpage;