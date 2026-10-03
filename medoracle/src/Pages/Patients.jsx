import "./Patients.css";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {

  FaSearch,

  FaUserPlus,

  FaRobot,

  FaEdit,

  FaTrash,

  FaUsers

} from "react-icons/fa";

function Patients() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    patientName: "",

    age: "",

    gender: "",

    phone: "",

    bloodGroup: ""

  });

  /* ===========================
        GET PATIENTS
  =========================== */

  const fetchPatients = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        "http://localhost:5000/api/patients",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      setPatients(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchPatients();

  }, []);

  /* ===========================
        HANDLE CHANGE
  =========================== */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  /* ===========================
        SAVE
  =========================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(

          `http://localhost:5000/api/patients/${editId}`,

          form,

          {

            headers: {

              Authorization: `Bearer ${token}`

            }

          }

        );

        alert("Patient Updated Successfully");

      }

      else {

        await axios.post(

          "http://localhost:5000/api/patients",

          form,

          {

            headers: {

              Authorization: `Bearer ${token}`

            }

          }

        );

        alert("Patient Added Successfully");

      }

      setForm({

        patientName: "",

        age: "",

        gender: "",

        phone: "",

        bloodGroup: ""

      });

      setEditId(null);

      fetchPatients();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Something went wrong."

      );

    }

  };

  /* ===========================
        EDIT
  =========================== */

  const handleEdit = (patient) => {

    setEditId(patient.id);

    setForm({

      patientName: patient.patientName,

      age: patient.age,

      gender: patient.gender,

      phone: patient.phone,

      bloodGroup: patient.bloodGroup

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  /* ===========================
        DELETE
  =========================== */

  const handleDelete = async (id) => {

    const ok = window.confirm(

      "Delete this patient?"

    );

    if (!ok) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/patients/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      fetchPatients();

    }

    catch (err) {

      alert("Unable to delete patient.");

    }

  };

  /* ===========================
        OPEN AI
  =========================== */

  const handleGenerateAI = (patient) => {

    navigate(

      "/clinical-ai",

      {

        state: patient

      }

    );

  };

  /* ===========================
        SEARCH
  =========================== */

  const filteredPatients = patients.filter((patient) =>

    patient.patientName

      ?.toLowerCase()

      .includes(

        search.toLowerCase()

      )

  );

  return (

<div className="patients-page">

  {/* ===========================
          HEADER
  =========================== */}

  <div className="patients-header">

    <div>

      <h1>

        <FaUsers />

        Patients Management

      </h1>

      <p>

        Add, edit, search and generate AI clinical reports.

      </p>

    </div>

    <div className="patient-count">

      <span>Total Patients</span>

      <h2>{patients.length}</h2>

    </div>

  </div>

  {/* ===========================
          FORM
  =========================== */}

  <form

    className="patient-form"

    onSubmit={handleSubmit}

  >

    <input

      type="text"

      name="patientName"

      placeholder="Patient Name"

      value={form.patientName}

      onChange={handleChange}

      required

    />

    <input

      type="number"

      name="age"

      placeholder="Age"

      value={form.age}

      onChange={handleChange}

      required

    />

    <select

      name="gender"

      value={form.gender}

      onChange={handleChange}

      required

    >

      <option value="">

        Select Gender

      </option>

      <option value="Male">

        Male

      </option>

      <option value="Female">

        Female

      </option>

      <option value="Other">

        Other

      </option>

    </select>

    <input

      type="text"

      name="phone"

      placeholder="Phone Number"

      value={form.phone}

      onChange={handleChange}

    />

    <input

      type="text"

      name="bloodGroup"

      placeholder="Blood Group"

      value={form.bloodGroup}

      onChange={handleChange}

    />

    <button

      type="submit"

      className="save-btn"

    >

      <FaUserPlus />

      {

        editId

        ?

        "Update Patient"

        :

        "Add Patient"

      }

    </button>

  </form>

  {/* ===========================
          SEARCH
  =========================== */}

  <div className="search-wrapper">

    <FaSearch className="search-icon" />

    <input

      className="search-box"

      placeholder="Search patient by name..."

      value={search}

      onChange={(e)=>

        setSearch(

          e.target.value

        )

      }

    />

  </div>

  {/* ===========================
          TABLE
  =========================== */}

  <div className="table-card">

    <table>

      <thead>

        <tr>

          <th>Name</th>

          <th>Age</th>

          <th>Gender</th>

          <th>Phone</th>

          <th>Blood</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

      {

      loading

      ?

      (

      <tr>

      <td

      colSpan="6"

      className="loading-row"

      >

      Loading Patients...

      </td>

      </tr>

      )

      :

      filteredPatients.length===0

      ?

      (

      <tr>

      <td

      colSpan="6"

      className="loading-row"

      >

      No Patient Found

      </td>

      </tr>

      )

      :

      (

      filteredPatients.map((patient)=>(

      <tr

      key={patient.id}

      >

      <td>

      <div className="patient-name">

      <div className="avatar">

      {

      patient.patientName

      ?.charAt(0)

      ?.toUpperCase()

      }

      </div>

      <span>

      {patient.patientName}

      </span>

      </div>

      </td>

      <td>

      {patient.age}

      </td>

      <td>

      {patient.gender}

      </td>

      <td>

      {patient.phone}

      </td>

      <td>

      {patient.bloodGroup}

      </td>

      <td>

      <div className="action-buttons">

      <button

      className="edit-btn"

      onClick={()=>handleEdit(patient)}

      >

      <FaEdit />

      </button>

      <button

      className="ai-btn"

      onClick={()=>

      handleGenerateAI(patient)

      }

      >

      <FaRobot />

      </button>

      <button

      className="delete-btn"

      onClick={()=>

      handleDelete(patient.id)

      }

      >

      <FaTrash />

      </button>

      </div>

      </td>

      </tr>

      ))

      )

      }

      </tbody>

    </table>

  </div>

</div>

);

}

export default Patients;

