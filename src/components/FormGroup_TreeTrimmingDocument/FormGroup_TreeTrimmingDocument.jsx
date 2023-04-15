import './FormGroup_TreeTrimmingDocument.css';
import { useState,useEffect } from 'react';
import axios from "axios";
import DataTable_TreeTrimming from './DataTable_TreeTrimming';
import TreeTrimmingDataContext from './TreeTrimmingDataContext';
import {Button,Label,InputGroup,Input,Alert,Row } from "reactstrap"
import {DatePicker} from 'reactstrap-date-picker'
import 'bootstrap/dist/css/bootstrap.min.css';

const FormGroup_TreeTrimmingDocument = ()=>{
  const options_karnfaifa = ["กฟจ.ยะลา","กฟส.บันนังสตา","กฟส.รามัน","กฟจ.นราธิวาส","กฟส.ระแงะ",
                            "กฟส.รือเสาะ","กฟส.ตากใบ","กฟจ.ปัตตานี","กฟส.โคกโพธิ์","กฟส.หนองจิก",
                            "กฟจ.สงขลา","กฟอ.จะนะ","กฟส.นาทวี","กฟส.สิงหนคร","กฟส.สะบ้าย้อย",
                            "กฟส.เทพา","กฟจ.สตูล","กฟส.ละงู","กฟส.ควนกาหลง","กฟจ.พัทลุง",
                            "กฟส.ตะโหมด","กฟส.ควนขนุน","กฟส.ปากพะยูน","กฟอ.หาดใหญ","กฟส.รัตภูมิ",
                            "กฟส.นาหม่อม","กฟอ.สุไหงโกลก","กฟอ.เบตง","กฟอ.สายบุรี","กฟส.มายอ",
                            "กฟอ.ระโนด","กฟส.สทิงพระ","กฟอ.สะเดา","กฟส.พังลา"];
  const [karnfaifa,setKarnfaifa] = useState("")
  const [treetrimmingdata,setTreetrimmingdata] = useState([])
  const [isloading,setIsloading] = useState(false)
  const [addData,setAddData] = useState([])

  //datepicker part
  const [checkDate, setCheckDate]= useState()
  const [disbursementDate, setDisbursementDate]= useState()

  //for reload when finish add data to googlesheet
  const [reload,setReload] = useState(false)


  //file part
  const [file,setFile] = useState();
  const [fileAlert,setFileAlert] = useState(false)
  const handleFileChange = (val) => {
    if(val.target.files[0].type === "application/pdf")
    {
      setFile(val.target.files[0])
      setFileAlert(false)
      console.log("yes pdf file")
    }
    else
    {
      console.log("fail")
      setFileAlert(true)
    }
  }

  useEffect(()=>{
    //clear data
    setTreetrimmingdata([]);
    setAddData([])
    setCheckDate()
    setDisbursementDate()
    setFile()

    //get data from app script
    setIsloading(true)
    const getData = async () => {
      const url = "https://script.google.com/macros/s/AKfycbyuXgzRiPrpCVTL_29bEsXs_qD5-QXZErrJ0MJl3ptt6Sxmvf6t0hprk_WzOR5L3MmF/exec?karnfaifa="+karnfaifa
      const response = await axios.get( url,{crossDomain: true});
      await setTreetrimmingdata(response.data);
      setIsloading(false)
    }
    getData();

  },[karnfaifa,reload])

  // const changeShowData = async() => {
  //    let list_ID = [0]
  //    addData.map((val)=>list_ID.push(val.id))
  //    await setTreetrimmingdata(treetrimmingdata.filter(val => list_ID.indexOf(val.id)<0) )
  // }

  const optionsChange = (val)=>{
    console.log(val.target.value)
    setKarnfaifa(val.target.value)
  }

  const deleteAddData= (val)=>{
    const id = val.target.id;
    setAddData(addData.filter(val => {
      return val.id !== Number(id)
    }))
    
  }

  const sendData = ()=>{
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = f => {
    
      const url = "https://script.google.com/macros/s/AKfycbyuXgzRiPrpCVTL_29bEsXs_qD5-QXZErrJ0MJl3ptt6Sxmvf6t0hprk_WzOR5L3MmF/exec";  // <--- Please set the URL of Web Apps.
      
      const qs = new URLSearchParams({path: "treetrimming2566"});

      const params = {
        myfile: [...new Int8Array(f.target.result)],
        mimetype: "application/pdf",
        filename: file.name,
        useremail: "p,wiriyar@gmail.com",
        karnfaifa,
        checkDate,
        disbursementDate,
        addData
      }
  
      fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify(params)})
      .then(res => res.json())
      .then(e => {
        console.log(e)
        setReload(!reload)})  // <--- You can retrieve the returned value here.
      .catch(err => console.log(err));
    }

    console.log(addData)
  }



  return (
    <TreeTrimmingDataContext.Provider value={{addData,setAddData}} >
      <Row>
        <label for="karnfaifa">การไฟฟ้า: {karnfaifa}</label>
        <select name="karnfaifa" id="karnfaifa"  onChange={optionsChange}>
          <option value="">...การไฟฟ้า</option>
          {options_karnfaifa.map((val,i)=><option key={i} value={val}>{val}</option>)}
        </select>
        {isloading ? (
          <p>Loading...</p>
        ) : (
          <DataTable_TreeTrimming treetrimmingdata={treetrimmingdata}/>
        )}
      



      <div className='container'>
        แผนงานที่จะเพิ่มข้อมูล
      </div>
      <div className='card-container'>
        {addData.map((val,i) => (
          <div className='card' key={i}> 
            <h3 className='deleteItem' id={val.id} onClick={deleteAddData}>X</h3>
            <p>{val.zpm4_name}</p> 
            <p>ZPM4: {val.zpm4}</p> 
            <p>ค่าจ้าง: {val.budget} บาท</p> 
          </div>
        ))}
      </div>
      
    
          <div className='container'>
            <InputGroup >
              <Label>วันที่ตรวจรับ</Label>
              <DatePicker placeholder="วันที่ตรวจรับ" value = {checkDate} onChange={(val) => setCheckDate(val)} />
            </InputGroup>
            <InputGroup>
              <Label>วันที่เบิกจ่าย</Label>
              <DatePicker placeholder="วันที่เบิกจ่าย" value = {disbursementDate} onChange={(val)=>setDisbursementDate(val)} />
            </InputGroup>
            <br/>
            <InputGroup>
              <Label>แนบไฟล์</Label>
              <Input type="file" onChange={handleFileChange}/>
            </InputGroup>
            <Alert color="danger" isOpen={fileAlert}>This is a primary alert — check it out!</Alert>
            <br/>
            {(addData.length>0)&&(file)&&(checkDate)&&(disbursementDate) ? (<Button color="primary" onClick={sendData}>เพิ่มข้อมูล</Button>):(<div></div>)}
          </div>
          </Row>
        
    </TreeTrimmingDataContext.Provider >
  );
}
      
      
export default FormGroup_TreeTrimmingDocument;

