import "./FormGroup_TreeTrimmingDocument.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable_TreeTrimming from "./DataTable_TreeTrimming";
import TreeTrimmingDataContext from "./TreeTrimmingDataContext";
import {
  Button,
  Label,
  InputGroup,
  Input,
  Alert,
  Row,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Col,
  CardText,
  CardTitle,
  Card,
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

const FormGroup_TreeTrimmingDocument = ({ user, userdata }) => {
  const [treetrimmingdata, setTreetrimmingdata] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [addData, setAddData] = useState([]);

  //datepicker part
  const [checkDate, setCheckDate] = useState();
  const [disbursementDate, setDisbursementDate] = useState();

  //for reload when finish add data to googlesheet
  const [reload, setReload] = useState(false);

  //for modal
  const [modal, setModal] = useState(false);
  const [modaltext, setModaltext] = useState("");

  //file part
  const [file, setFile] = useState();
  const [fileAlert, setFileAlert] = useState(false);
  const handleFileChange = (val) => {
    if (val.target.files[0].type === "application/pdf") {
      setFile(val.target.files[0]);
      setFileAlert(false);
      console.log("yes pdf file");
    } else {
      console.log("fail");
      setFileAlert(true);
    }
  };

  useEffect(() => {
    //clear data
    setTreetrimmingdata([]);
    setAddData([]);
    setCheckDate();
    setDisbursementDate();
    setFile();

    //get data from app script
    setIsloading(true);
    setModaltext("Loading...");
    setModal(true);
    const getData = async () => {
      const url =
        "https://script.google.com/macros/s/AKfycbyuXgzRiPrpCVTL_29bEsXs_qD5-QXZErrJ0MJl3ptt6Sxmvf6t0hprk_WzOR5L3MmF/exec?karnfaifa=" +
        userdata.karnfaifa;
      const response = await axios.get(url);
      setTreetrimmingdata(response.data);
      setIsloading(false);
      setModal(false);
      setModaltext("");
    };
    getData();
  }, [userdata, reload]);

  // const changeShowData = async() => {
  //    let list_ID = [0]
  //    addData.map((val)=>list_ID.push(val.id))
  //    await setTreetrimmingdata(treetrimmingdata.filter(val => list_ID.indexOf(val.id)<0) )
  // }

  const deleteAddData = (val) => {
    const id = val.target.id;
    setAddData(
      addData.filter((val) => {
        return val.id !== Number(id);
      })
    );
  };

  const sendData = () => {
    setModal(true)
    setModaltext("รอสักครู่กำลัง Upload...")
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
      const url =
        "https://script.google.com/macros/s/AKfycbyuXgzRiPrpCVTL_29bEsXs_qD5-QXZErrJ0MJl3ptt6Sxmvf6t0hprk_WzOR5L3MmF/exec"; // <--- Please set the URL of Web Apps.

      const qs = new URLSearchParams({ path: "treetrimming2566" });

      const params = {
        myfile: [...new Int8Array(f.target.result)],
        mimetype: "application/pdf",
        filename: file.name,
        useremail: user,
        karnfaifa: user.karnfaifa,
        checkDate,
        disbursementDate,
        addData,
      };

      fetch(`${url}?${qs}`, { method: "POST", body: JSON.stringify(params),mode: 'no-cors' })
        .then((res) => res.json())
        .then(async (e) => {
          console.log(e);
          setModal(false)
          setReload(!reload)
        }) // <--- You can retrieve the returned value here.
        .catch(async (err) => {
          console.log(err)
          setModal(false)
          window.alert("เกิดข้อผิดพลาด โปรดลองอีกครั้ง หรือโทร 0883874774")
        });
    };

    console.log(addData);
  };

  return (
    <TreeTrimmingDataContext.Provider value={{ addData, setAddData }}>
      <Modal centered size="sm" isOpen={modal}>
        <ModalBody>{modaltext}</ModalBody>
      </Modal>
      <Container fluid="md" className="mx-auto shadow p-3 my-3 bg-body rounded">
        <h5 style={{ borderLeft: "2px solid #3B71CA", padding: "1rem" }}>
          เลือกแผนงานเพื่อลงข้อมูล
        </h5>

        {isloading ? undefined : (
          <DataTable_TreeTrimming treetrimmingdata={treetrimmingdata} />
        )}
      </Container>

      <Container fluid="md" className="mx-auto shadow p-3 my-3 bg-body rounded">
        <h5 style={{ borderLeft: "2px solid #3B71CA", padding: "1rem" }}>
          แผนงานที่เลือก
        </h5>
        <Row lg="4" md="3" sm="2" xs="1">
          {addData.map((val, i) => (
            <Col className="mb-3 p-1" key={i}>
              <Card style={{ borderTop: "2px solid #3B71CA " }} body>
                <CardTitle>{val.zpm4_name}</CardTitle>
                <CardText>
                  <p style={{ margin: "-0.5rem 0rem 0px 0px" }}>
                    ZPM4: {val.zpm4}
                  </p>
                  <p style={{ margin: "0px 0rem 0px 0px " }}>
                    ค่าจ้าง: {val.budget} บาท
                  </p>
                </CardText>
                <Button
                  style={{ position: "absolute", bottom: "25%", right: "5%" }}
                  close
                  id={val.id}
                  onClick={deleteAddData}
                ></Button>
              </Card>
            </Col>
          ))}
        </Row>
        <InputGroup>
          <Label className="mb-0">วันที่ตรวจรับ</Label>
          <DatePicker
            className="mb-3"
            placeholder="วันที่ตรวจรับ"
            value={checkDate}
            onChange={(val) => setCheckDate(val)}
          />
        </InputGroup>
        <InputGroup>
          <Label className="mb-0">วันที่เบิกจ่าย</Label>
          <DatePicker
            className="mb-3"
            placeholder="วันที่เบิกจ่าย"
            value={disbursementDate}
            onChange={(val) => setDisbursementDate(val)}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <Input type="file" onChange={handleFileChange} />
        </InputGroup>
        <Alert color="danger" isOpen={fileAlert}>
          This is a primary alert — check it out!
        </Alert>
        <br />
        {addData.length > 0 && file && checkDate && disbursementDate ? (
          <Button color="primary" onClick={sendData}>
            เพิ่มข้อมูล
          </Button>
        ) : (
          <div></div>
        )}
      </Container>
    </TreeTrimmingDataContext.Provider>
  );
};

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default FormGroup_TreeTrimmingDocument;
