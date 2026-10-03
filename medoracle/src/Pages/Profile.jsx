import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [profile, setProfile] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // =========================
  // GET PROFILE
  // =========================

  const fetchProfile = async () => {

    if (!token) return;

    try {

      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      window.dispatchEvent(new Event("userUpdated"));

    }

    catch (err) {

      console.log(err.response?.data || err.message);

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value

    });

  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.put(

        "http://localhost:5000/api/profile",

        profile,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      alert(res.data.message);

      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      );

      window.dispatchEvent(new Event("userUpdated"));

      fetchProfile();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Update Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const uploadImage = async () => {

    if (!image) {

      alert("Select Image First");

      return;

    }

    const formData = new FormData();

    formData.append(

      "profileImage",

      image

    );

    try {

      const res = await axios.post(

        "http://localhost:5000/api/profile/upload-image",

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data"

          }

        }

      );

      alert(res.data.message);

      const updated = await axios.get(

        "http://localhost:5000/api/profile",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      setProfile(updated.data);

      localStorage.setItem(

        "user",

        JSON.stringify(updated.data)

      );

      window.dispatchEvent(new Event("userUpdated"));

      setImage(null);

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        err.message

      );

    }

  };

  return (

    <div className="profile-page">

      <div className="profile-card">

        <h2>My Profile</h2>

        {/* IMAGE */}

        <div className="profile-image-section">

  <img

    src={

      profile.profileImage

        ? `http://localhost:5000/uploads/${profile.profileImage}`

        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"

    }

    alt="profile"

  />
          <input

            type="file"

            onChange={handleImageChange}

          />

          <button

            type="button"

            onClick={uploadImage}

          >

            Upload Image

          </button>

        </div>

        {/* FORM */}

        <form onSubmit={handleUpdate}>

          <div className="grid">

            <input
              type="text"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              type="text"
              value={profile.email || ""}
              disabled
            />

            <input
              type="text"
              name="specialization"
              value={profile.specialization || ""}
              onChange={handleChange}
              placeholder="Specialization"
            />

            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              type="text"
              name="qualification"
              value={profile.qualification || ""}
              onChange={handleChange}
              placeholder="Qualification"
            />

            <input
              type="text"
              name="experience"
              value={profile.experience || ""}
              onChange={handleChange}
              placeholder="Experience"
            />

            <input
              type="text"
              name="hospital"
              value={profile.hospital || ""}
              onChange={handleChange}
              placeholder="Hospital"
            />

            <input
              type="text"
              name="address"
              value={profile.address || ""}
              onChange={handleChange}
              placeholder="Address"
            />

          </div>

          <textarea

            name="bio"

            value={profile.bio || ""}

            onChange={handleChange}

            placeholder="Bio"

          />

          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

                ? "Saving..."

                : "Save Changes"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Profile;