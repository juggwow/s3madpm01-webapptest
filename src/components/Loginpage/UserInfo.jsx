import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
  FormText,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import {db} from './firebase' //เข้าถึง db ในโปรเจ็คที่สร้างไว้
import { doc, getDoc, collection, setDoc,addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function UserInfo({isRegistor,setIsRegistor,isLogin,setIsLogin,user,setUser,userdata,setUserdata}) {
  const [disabled, setDisabled] = useState(true);
  const [data,setData] = useState(userdata)
  const [modal, setModal] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
    (!isRegistor)?setDisabled(false):undefined
  },[userdata])

  const datatoFirestore = async(e)=>{
    e.preventDefault();
    if(/[0-9]/.test(data.userid)&&/[\u0E00-\u0E7Fa-zA-Z']/.test(data.firstname)&&/[\u0E00-\u0E7Fa-zA-Z']/.test(data.lastname)&&(data.karnfaifa !== "")&&/[0][0-9]{9}$/.test(data.mobileno)){
      try{
        //เพิ่ม data ไปยัง firestore
    const dbRef = collection(db, "userofs3madpm01");
    await setDoc(doc(dbRef,user), data); //doc(collection ของ firestore,ชื่อ document)
    setUserdata(data)
    setIsRegistor(true)
      }
      catch(err){
        setModal(true)
      }
      navigate("/")
      
    }
    else setModal(true)
    
  }

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

  

  console.log(/[0-9]/.test(data.userid)&&/[\u0E00-\u0E7Fa-zA-Z']/.test(data.firstname)&&/[\u0E00-\u0E7Fa-zA-Z']/.test(data.lastname)&&(data.karnfaifa !== "")&&/[0][0-9]{9}$/.test(data.mobileno))


  return (
    <div>
    <Form
      style={{ maxWidth: "400px" }}
      className="mx-auto shadow p-3 mt-3 bg-body rounded"
    >
      <p>ข้อมูลผู้ใช้</p>
      {(!isRegistor)?(<p style={{color:"red"}}>กรุณากรอกข้อมูลผู้ใช้</p>):(undefined)}
      <FormGroup style={{ width: "100%" }} row>
        <Label size="sm" for="userid" className="mb-0">
          รหัสพนักงาน
        </Label>
        <Input
          invalid={!data.userid.match(/[0-9]/)}
          className="mx-auto mb-3"
          type="number"
          name="userid"
          id="userid"
          value={data.userid}
          disabled={disabled}
          required
          onChange={(val)=>setData({...data,userid:val.target.value})}
        />
        <FormFeedback style={{ marginTop: "-1rem" }}>
          เป็นตัวเลขเท่านั้น
        </FormFeedback>
      </FormGroup>
      <FormGroup style={{ width: "100%" }} row>
        <Label size="sm" for="firstname" className="mb-0">
          ชื่อ
        </Label>
        <Input
          invalid={!data.firstname.match(/[\u0E00-\u0E7Fa-zA-Z']/)}
          className="mx-auto mb-3"
          type="text"
          name="firstname"
          id="firstname"
          value={data.firstname}
          disabled={disabled}
          required
          onChange={(val)=>setData({...data,firstname:val.target.value})}
        />
        <FormFeedback style={{ marginTop: "-1rem" }}>
          เป็นตัวอักษรเท่านั้น
        </FormFeedback>
      </FormGroup>
      <FormGroup style={{ width: "100%" }} row>
        <Label size="sm" for="lastname" className="mb-0 ">
          นามสกุล
        </Label>
        <Input
          invalid={!data.lastname.match(/[\u0E00-\u0E7Fa-zA-Z']/)}
          className="mx-auto mb-3"
          type="text"
          name="lastname"
          id="lastname"
          value={data.lastname}
          disabled={disabled}
          required
          onChange={(val)=>setData({...data,lastname:val.target.value})}
        />
        <FormFeedback style={{ marginTop: "-1rem" }}>
          เป็นตัวอักษรเท่านั้น
        </FormFeedback>
      </FormGroup>
      <FormGroup style={{ width: "100%" }} row>
        <Label size="sm" for="karnfaifa" className="mb-0 ">
          สังกัด
        </Label>
        {disabled ? (
          <Input
            className="mx-auto mb-3"
            type="text"
            name="karnfaifa"
            id="karnfaifa"
            value={data.karnfaifa}
            required
            disabled
          />
        ) : (
          <Input
            invalid={data.karnfaifa === ""}
            className="mx-auto mb-3"
            type="select"
            name="karnfaifa"
            id="karnfaifa"
            disabled={disabled}
            required
            onChange={(val)=>setData({...data,karnfaifa:val.target.value})}
          >
            <option value="">...การไฟฟ้า</option>
            {options_karnfaifa.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </Input>
        )}
      </FormGroup>
      <FormGroup style={{ width: "100%" }} row>
        <Label size="sm" for="mobileno" className="mb-0">
          หมายเลขโทรศัพท์
        </Label>
        <Input
          invalid={!data.mobileno.match(/[0][0-9]{9}$/)}
          className="mx-auto mb-3"
          type="number"
          name="mobileno"
          id="mobileno"
          value={data.mobileno}
          disabled={disabled}
          required
          onChange={(val)=>setData({...data,mobileno:val.target.value})}
        />
        <FormFeedback style={{ marginTop: "-1rem" }}>
          ขึ้นต้นด้วย 0 และมีตัวเลขจำนวน 10 ตัว
        </FormFeedback>
      </FormGroup>
      {disabled ? (
        <Button color="primary" onClick={() => setDisabled(false)}>
          แก้ไขข้อมูล
        </Button>
      ) : (
        <Row>
          <Col>
            <Button
              type="submit"
              className="mx-3"
              color="warning"
              onClick={datatoFirestore}
            >
              ยืนยัน
            </Button>
            <Button
              className="mx-3"
              color="primary"
              onClick={() => setDisabled(true)}
            >
              ยกเลิก
            </Button>
          </Col>
        </Row>
      )}
    </Form>
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
    <ModalHeader toggle={()=>setModal(!modal)}>ERROR</ModalHeader>
    <ModalBody>ข้อมูลของคุณไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง</ModalBody>
    <ModalFooter>
           <Button color="secondary" onClick={()=>setModal(!modal)}>OK</Button>
         </ModalFooter>
    </Modal>
    </div>
  );
}

export default UserInfo;
