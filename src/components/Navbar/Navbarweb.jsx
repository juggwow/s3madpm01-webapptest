import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavLink
} from "reactstrap";

import { useNavigate,Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function Navbarweb({isLogin,userdata,isRegistor}) {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">S3MADPM01</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                ต้นไม้
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><NavLink tag={Link} to="/Treetrimmingdoc">เพิ่มข้อมูลการเบิกจ่าย</NavLink></DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="justify-content-end me-5" navbar>
            {isLogin?(
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {isRegistor? (<>{userdata.firstname} {userdata.karnfaifa}</>):undefined}
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>ออกจากระบบ</DropdownItem>
                <DropdownItem><NavLink tag={Link} to="/UserInfo">แก้ไขข้อมูล</NavLink></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            ):(
              <NavItem>
                <NavLink tag={Link} to="/Login">เข้าสู่ระบบ</NavLink>
              </NavItem>
            )}
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navbarweb;
