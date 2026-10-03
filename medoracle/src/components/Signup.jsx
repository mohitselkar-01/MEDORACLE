import "./Signup.css";

import { useState } from "react";

import axios from "axios";

function Signup() {

const [formData, setFormData] = useState({


fullName: "",
email: "",
specialization: "",
password: ""


});

// HANDLE INPUT CHANGE

const handleChange = (e) => {


setFormData({

  ...formData,

  [e.target.name]: e.target.value

});


};

// HANDLE SIGNUP

const handleSignup = async (e) => {


e.preventDefault();

try {

  const response = await axios.post(

    "http://localhost:5000/api/auth/signup",

    formData

  );

  alert(response.data.message);

  console.log(response.data);

}

catch(error){

  alert(error.response.data.message);

}


};

return (


<div className="signup-page">

  <div className="signup-card">

    <h1>Create Doctor Account</h1>

    <p>
      Join MEDORACLE AI Clinical Intelligence Platform
    </p>

    <form onSubmit={handleSignup}>

      <div className="form-grid">

        <div className="input-group">

          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="Dr. John Doe"
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="doctor@email.com"
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>Specialization</label>

          <select
            name="specialization"
            onChange={handleChange}
          >

            <option value="">
              Select
            </option>

            <option value="Cardiology">
              Cardiology
            </option>

            <option value="Neurology">
              Neurology
            </option>

            <option value="Orthopedics">
              Orthopedics
            </option>

            <option value="Dermatology">
              Dermatology
            </option>

            <option value="Pediatrics">
              Pediatrics
            </option>

          </select>

        </div>

        <div className="input-group">

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
          />

        </div>

      </div>

      <button
        type="submit"
        className="signup-submit"
      >

        Create Account

      </button>

    </form>

  </div>

</div>


);

}

export default Signup;
