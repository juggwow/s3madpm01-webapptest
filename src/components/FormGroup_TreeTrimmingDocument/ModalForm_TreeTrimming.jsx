import React, { useState, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TreeTrimmingDataContext from "./TreeTrimmingDataContext";

const ModalForm_TreeTrimming = (props) => {
  const id_value = props.id;
  const zpm4_name_value = props.zpm4_name;

  const [modal, setModal] = useState(false);
  const [zpm4_value, setZPM4_value] = useState(0);
  const [budget_value, setBudget_value] = useState("");

  const { addData, setAddData } = useContext(TreeTrimmingDataContext);
  //const [data,setData] = useState({})
  const toggle = () => setModal(!modal);

  const onChangeBudget = (val) => {
    setBudget_value(val.target.value);
  };

  const onChangeZPM4 = (val) => {
    setZPM4_value(val.target.value);
  };

  const submitHandle = (event) => {
    //event.preventDefault()
    const addItem = async () => {
      await setAddData([
        ...addData,
        {
          id: id_value,
          zpm4_name: zpm4_name_value,
          zpm4: zpm4_value,
          budget: Number(budget_value),
        },
      ]);
    };
    addItem();
    toggle();
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        เลือก
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>เพิ่มข้อมูล</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup style={{ width: "100%" }}>
              <Label className="mb-0" for="id">
                รายการที่
              </Label>
              <Input
                style={{ marginTop: "-0.25rem", marginBottom: "2rem" }}
                type="number"
                name="id"
                id="id"
                value={props.id}
                disabled
              />
              <Label className="mb-0" for="zpm4_name">
                ชื่อใบสั่ง
              </Label>
              <Input
                style={{ marginBottom: "2rem" }}
                type="textarea"
                name="zpm4_name"
                id="zpm4_name"
                value={props.zpm4_name}
                disabled
              />
              <Label className="mb-0" for="zpm4">
                ZPM4
              </Label>
              <Input
                invalid={!/[4][0][0][0-9]{7}/.test(zpm4_value)}
                style={{ marginTop: "-0.25rem", marginBottom: "2rem" }}
                type="number"
                name="zpm4"
                id="zpm4"
                placeholder="หมายเลขใบสั่ง ZPM4"
                onChange={onChangeZPM4}
              />
              <Label className="mb-0" for="budget">
                ค่าจ้าง
              </Label>
              <Input
                invalid={budget_value === ""}
                style={{ marginTop: "-0.25rem", marginBottom: "2rem" }}
                type="number"
                name="budget"
                id="budget"
                placeholder="ค่าจ้าง"
                onChange={onChangeBudget}
              />
              <FormFeedback>กรุณากรอกข้อมูลให้ถูกต้อง</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={
              /[4][0][0][0-9]{7}/.test(zpm4_value) && budget_value !== ""
                ? submitHandle
                : undefined
            }
          >
            เพิ่มข้อมูล
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalForm_TreeTrimming;
