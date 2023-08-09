import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, getDoc, collection, setDoc, addDoc } from "firebase/firestore";
import axios from "axios";
import { db } from "./firebase"; //เข้าถึง db ในโปรเจ็คที่สร้างไว้
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";

function Loginpage({ setIsRegistor, setIsLogin, user, setUser, setUserdata }) {
  let navigate = useNavigate();

  const options_karnfaifa = [
    "กฟจ.ยะลา",
    "กฟส.บันนังสตา",
    "กฟส.รามัน",
    "กฟจ.นราธิวาส",
    "กฟส.ระแงะ",
    "กฟส.รือเสาะ",
    "กฟส.ตากใบ",
    "กฟจ.ปัตตานี",
    "กฟส.โคกโพธิ์",
    "กฟส.หนองจิก",
    "กฟจ.สงขลา",
    "กฟอ.จะนะ",
    "กฟส.นาทวี",
    "กฟส.สิงหนคร",
    "กฟส.สะบ้าย้อย",
    "กฟส.เทพา",
    "กฟจ.สตูล",
    "กฟส.ละงู",
    "กฟส.ควนกาหลง",
    "กฟจ.พัทลุง",
    "กฟส.ตะโหมด",
    "กฟส.ควนขนุน",
    "กฟส.ปากพะยูน",
    "กฟอ.หาดใหญ",
    "กฟส.รัตภูมิ",
    "กฟส.นาหม่อม",
    "กฟอ.สุไหงโกลก",
    "กฟอ.เบตง",
    "กฟอ.สายบุรี",
    "กฟส.มายอ",
    "กฟอ.ระโนด",
    "กฟส.สทิงพระ",
    "กฟอ.สะเดา",
    "กฟส.พังลา",
  ];
  const [show, setShow] = useState("hidden");

  const [userid, setUserID] = useState("");
  const [karnfaifa, setKarnfaifa] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileno, setMobileno] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        //ส่ง token เพื่อรับข้อมูล user จาก google
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const useremail = data.data.email;
        setUser(data.data.email);
        //หาข้อมูล user ใน firestore
        const docRef = doc(db, "userofs3madpm01", useremail);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserdata(docSnap.data());
          setIsLogin(true);
          navigate("/");
          setIsRegistor(true);
        } else {
          navigate("/UserInfo");
          setIsLogin(true);
        }
      } catch (err) {
        console.log(
          "ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาติดต่อ 088-3874774"
        );
        console.log(err.message);
        navigate("/");
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const datatoFirestore = async (e) => {
    e.preventDefault();
    //เพิ่ม data ไปยัง firestore
    const data = { userid, firstname, lastname, mobileno, karnfaifa };
    const dbRef = collection(db, "userofs3madpm01");
    await setDoc(doc(dbRef, user), data); //doc(collection ของ firestore,ชื่อ document)
    setUserdata(data);
    setIsRegistor(true);
    setIsLogin(true);
    setShow("");
  };

  const googleLogout = () => {
    setUser("");
    setUserdata({});
    setIsLogin(false);
    setIsRegistor(true);
    setShow("hidden");

    setUserID("");
    setKarnfaifa("");
    setFirstname("");
    setLastname("");
    setMobileno("");
  };

  return (
    <Container
      style={{ height: "400px", marginTop: "150px", maxWidth: "400px" }}
      className="mx-auto shadow p-3 bg-body rounded"
    >
      <Row>
        <p>เข้าสู่ระบบ</p>
      </Row>
      <Row>
        <Button color="primary" className="p-3" onClick={() => googleLogin()}>
          Sign in with Google
        </Button>
      </Row>
    </Container>
  );
}

export default Loginpage;
