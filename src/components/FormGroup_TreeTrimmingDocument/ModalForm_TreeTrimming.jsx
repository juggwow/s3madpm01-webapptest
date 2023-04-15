import React,{useState,useContext} from "react";
import {Modal, ModalHeader,ModalBody,ModalFooter,Button,Form,FormGroup,Label,Input} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import TreeTrimmingDataContext from "./TreeTrimmingDataContext";


const ModalForm_TreeTrimming = (props)=>{

  const id_value = props.id;
  const zpm4_name_value = props.zpm4_name

  const [modal,setModal] = useState(false);
  const [zpm4_value,setZPM4_value] = useState(0);
  const [budget_value,setBudget_value] = useState(0);

  

  const {addData,setAddData} = useContext(TreeTrimmingDataContext)
  //const [data,setData] = useState({})
  const toggle = () => setModal(!modal);

  const onChangeBudget = (val) => {
    setBudget_value(val.target.value)
  }

  const onChangeZPM4 = (val) => {
    setZPM4_value(val.target.value)
  }

  const submitHandle = (event) => {
    //event.preventDefault()
    const addItem = async () => {
      await setAddData([...addData,{
        id: id_value,
        zpm4_name: zpm4_name_value,
        zpm4:Number(zpm4_value),
        budget:Number(budget_value), 
      }])
    }
    addItem();
    toggle();
  }

  return(
      <div>
        <Button color="primary" onClick={toggle}>เพิ่มข้อมูล</Button>
         <Modal isOpen={modal} toggle={toggle}>
           <ModalHeader toggle={toggle}>เพิ่มข้อมูล</ModalHeader>
           <ModalBody>
            <Form>
              <FormGroup>
                <Label for="id">รายการที่</Label>
                <Input type="number" name="id" id="id" value={props.id} disabled /> 
                <Label for="zpm4_name">ชื่อใบสั่ง</Label>
                <Input type="textarea" name="zpm4_name" id="zpm4_name" value={props.zpm4_name} disabled/>
                <Label for="zpm4">ZPM4</Label>
                <Input type="number" name="zpm4" id="zpm4" placeholder="หมายเลขใบสั่ง ZPM4" onChange={onChangeZPM4}/>
                <Label for="budget">ค่าจ้าง</Label>
                <Input type="number" name="budget" id="budget" placeholder="ค่าจ้าง" onChange={onChangeBudget}/>
              </FormGroup>
            </Form>
           </ModalBody>
           <ModalFooter>
           <Button color="primary" onClick={submitHandle}>เพิ่มข้อมูล</Button>{' '}
           <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
         </ModalFooter>
       </Modal>
     </div>
   );
}

export default ModalForm_TreeTrimming;