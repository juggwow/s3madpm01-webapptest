import './FormGroup_TreeTrimmingDocument.css';
import { useState,useEffect,useContext } from 'react';
import DataTable from 'react-data-table-component';
import ModalForm_TreeTrimming from './ModalForm_TreeTrimming';
import TreeTrimmingDataContext from './TreeTrimmingDataContext';

const DataTable_TreeTrimming = (props)=>{
  const {addData} = useContext(TreeTrimmingDataContext)
  const [quarterfilter,setQurterfilter] = useState("")
  const [searchfilter,setSearchfilter] = useState("")
  const treetrimmingdata = props.treetrimmingdata
  const [records,setRecords] = useState(treetrimmingdata)

  const columns = [
    {
        name: 'id',
        selector: row => row.id,
        maxWidth: "60px",
        center: true
    },
    {
        name: 'ชื่อแผน',
        selector: row => row.zpm4_name,
        wrap: true
    },
    {
        name: 'เพิ่มข้อมูล',
        cell:(row) => (<ModalForm_TreeTrimming id = {row.id} zpm4_name = {row.zpm4_name}/> ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
  ];  

  useEffect(()=>{
    let list_ID = [0]
    addData.map((val)=>list_ID.push(val.id))
    setRecords(treetrimmingdata.filter(val => val.zpm4_name.includes(quarterfilter) && val.zpm4_name.includes(searchfilter) && list_ID.indexOf(val.id)<0))
  },[addData,quarterfilter,searchfilter])

  return (
    <div>
      <div className='filter'>
        <label for="quarter">ไตรมาส: </label>
        <select name="quarter" id="quarter" onChange={(val)=>setQurterfilter(val)}> 
          <option value="">...</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <label for="searchData">ค้นหา: </label>
        <input type="text" name="searchData" id="searchData" placeholder='ค้นหา..' onChange={(val)=>setSearchfilter(val)} />
      </div>
      <DataTable
            columns={columns}
            data={records}
            pagination
      />
    </div>
  );
}
      
      
export default DataTable_TreeTrimming;

