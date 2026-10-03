import "./Reports.css";

import { useEffect, useState } from "react";

import axios from "axios";

import {

FaSearch,

FaFileMedical,

FaUserInjured,

FaEye,

FaRobot,

FaCalendarAlt

} from "react-icons/fa";

function Reports() {

const token = localStorage.getItem("token");

const [reports,setReports]=useState([]);

const [search,setSearch]=useState("");

const [selectedReport,setSelectedReport]=useState(null);

/* ===========================
        GET REPORTS
=========================== */

const fetchReports=async()=>{

try{

const res=await axios.get(

"http://localhost:5000/api/reports",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

setReports(res.data);

}

catch(error){

console.log(error.response?.data||error.message);

}

};

useEffect(()=>{

fetchReports();

},[]);

/* ===========================
        SEARCH
=========================== */

const filteredReports=reports.filter((item)=>{

const keyword=search.toLowerCase();

return(

item.patientName?.toLowerCase().includes(keyword)

||

item.diagnosis?.toLowerCase().includes(keyword)

||

item.diagnosis?.toLowerCase().includes(keyword)

||

item.gender?.toLowerCase().includes(keyword)

);

});

return(

<div className="reports-page">

{/* ===========================
        HEADER
=========================== */}

<div className="reports-header">

<div>

<h1>

<FaFileMedical/>

Medical Reports

</h1>

<p>

AI Generated Clinical Reports & Patient History

</p>

</div>

<div className="report-count">

<span>Total Reports</span>

<h2>

{reports.length}

</h2>

</div>

</div>

{/* ===========================
        SEARCH
=========================== */}

<div className="search-wrapper">

<FaSearch className="search-icon"/>

<input

className="search-box"

type="text"

placeholder="Search by Patient, Diagnosis or Gender..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

{/* ===========================
        TABLE
=========================== */}

<div className="table-card">

<table className="reports-table">

<thead>

<tr>

<th>Patient</th>

<th>Age</th>

<th>Gender</th>

<th>Diagnosis</th>

<th>AI Summary</th>

<th>Date</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredReports.length>0?

filteredReports.map((item)=>(

<tr key={item.id}>

<td>

<div className="patient-info">

<div className="patient-avatar">

{item.patientName?.charAt(0).toUpperCase()}

</div>

<div>

<h4>

{item.patientName}

</h4>

<p>

Patient

</p>

</div>

</div>

</td>

<td>

{item.age}

</td>

<td>

{item.gender}

</td>

<td>

{item.diagnosis||"-"}

</td>

<td>

<div className="ai-preview">

{

item.notes
?
item.notes.substring(0,120)+"..."
:
"No AI Response"

}

</div>

</td>

<td>

<FaCalendarAlt/>

{" "}

{new Date(item.createdAt).toLocaleDateString()}

</td>

<td>

<button

className="view-btn"

onClick={()=>setSelectedReport(item)}

>

<FaEye/>

View

</button>

</td>

</tr>

))

:(

<tr>

<td

colSpan="7"

className="no-data"

>

<FaUserInjured

style={{

fontSize:"22px",

marginRight:"10px"

}}

/>

No Reports Found

</td>

</tr>

)

}

</tbody>

</table>

</div>

{/* ===========================
        REPORT MODAL
=========================== */}

{

selectedReport && (

<div

className="report-modal"

onClick={()=>setSelectedReport(null)}

>

<div

className="report-modal-content"

onClick={(e)=>e.stopPropagation()}

>

<div className="modal-header">

<h2>

<FaRobot/>

AI Clinical Report

</h2>

<button

className="close-btn"

onClick={()=>setSelectedReport(null)}

>

✕

</button>

</div>

<div className="modal-body">

<div className="modal-grid">

<div>

<strong>

Patient Name

</strong>

<p>

{selectedReport.patientName}

</p>

</div>

<div>

<strong>

Age

</strong>

<p>

{selectedReport.age}

</p>

</div>

<div>

<strong>

Gender

</strong>

<p>

{selectedReport.gender}

</p>

</div>

<div>

<strong>

Date

</strong>

<p>

{

new Date(

selectedReport.createdAt

).toLocaleDateString()

}

</p>

</div>

</div>

<div className="report-section">

<h3>

Doctor Diagnosis

</h3>

<p>

{

selectedReport.diagnosis ||

"No Diagnosis"

}

</p>

</div>

<div className="report-section">

<h3>

AI Clinical Analysis

</h3>

<div className="ai-report-full">

<pre>

{

selectedReport.notes || 

"No AI Response"

}

</pre>

</div>

</div>

</div>

</div>

</div>

)

}

</div>

);

}

export default Reports;