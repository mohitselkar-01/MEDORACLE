import "./Appointments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

import {
  FaCheckCircle,
  FaClock,
  FaTrash,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";

function Appointments() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    disease: "",
    notes: "",
    status: "Pending",
  });

  /* ===========================
        GET APPOINTMENTS
  =========================== */

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/api/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointments Response :", res.data);

      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ===========================
        HANDLE CHANGE
  =========================== */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ===========================
        ADD / UPDATE
  =========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${API_BASE_URL}/api/appointments/${editId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Appointment Updated Successfully");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/appointments`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Appointment Booked Successfully");
      }

      setForm({
        patientName: "",
        age: "",
        gender: "",
        phone: "",
        appointmentDate: "",
        appointmentTime: "",
        disease: "",
        notes: "",
        status: "Pending",
      });

      setEditId(null);

      fetchAppointments();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

    /* ===========================
        EDIT
  =========================== */

  const handleEdit = (appointment) => {
    setEditId(appointment.id);

    setForm({
      patientName: appointment.patientName || "",
      age: appointment.age || "",
      gender: appointment.gender || "",
      phone: appointment.phone || "",
      appointmentDate: appointment.appointmentDate || "",
      appointmentTime: appointment.appointmentTime || "",
      disease: appointment.disease || "",
      notes: appointment.notes || "",
      status: appointment.status || "Pending",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ===========================
        DELETE
  =========================== */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Deleted Successfully");

      fetchAppointments();
    } catch (err) {
      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  /* ===========================
      APPROVE + ADD PATIENT
  =========================== */

  const approveAndAddPatient = async (id) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/appointments/approve-add-patient/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchAppointments();
    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
          "Approval Failed"
      );
    }
  };

  /* ===========================
        SEARCH
  =========================== */

  const filteredAppointments = Array.isArray(appointments)
    ? appointments.filter((item) =>
        item.patientName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="appointments-page">
      <h2>Appointment Management</h2>

      {/* ===========================
            FORM
      =========================== */}

      <form
        className="appointment-form"
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
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="appointmentTime"
          value={form.appointmentTime}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
        />

        <button type="submit">
          {editId
            ? "Update Appointment"
            : "Book Appointment"}
        </button>
      </form>

            {/* ===========================
            SEARCH
      =========================== */}

      <input
        className="appointment-search"
        type="text"
        placeholder="Search Patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===========================
            TABLE
      =========================== */}

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Disease</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="9"
                className="loading-row"
              >
                Loading Appointments...
              </td>
            </tr>
          ) : filteredAppointments.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                className="loading-row"
              >
                No Appointment Found
              </td>
            </tr>
          ) : (
            filteredAppointments.map((item) => (
              <tr key={item.id}>

                               <td>{item.patientName}</td>

                <td>{item.age}</td>

                <td>{item.gender}</td>

                <td>{item.phone}</td>

                <td>
                  {item.appointmentDate
                    ? new Date(
                        item.appointmentDate
                      ).toLocaleDateString("en-GB")
                    : "-"}
                </td>

                <td>{item.appointmentTime}</td>

                <td>{item.disease || "-"}</td>

                <td>
                  {item.status === "Confirmed" ? (
                    <span className="confirmed-badge">
                      <FaCheckCircle /> Confirmed
                    </span>
                  ) : (
                    <span className="pending-badge">
                      <FaClock /> Pending
                    </span>
                  )}
                </td>

                <td>
                  <div className="action-buttons">
                    {item.status === "Pending" && (
                      <button
                        type="button"
                        className="approve-btn"
                        onClick={() =>
                          approveAndAddPatient(item.id)
                        }
                        title="Approve & Add Patient"
                      >
                        <FaUserPlus />
                      </button>
                    )}

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(item)
                      }
                      title="Edit Appointment"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      title="Delete Appointment"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )} 

                  </tbody>
      </table>
    </div>
  );
}

export default Appointments;