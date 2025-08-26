import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";

import Feed from "./Feed";
import toast from "react-hot-toast";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const { name, age, about, skills, profileImg } = user;

  const [Name, setName] = useState(name);
  const [Age, setAge] = useState(age);
  const [About, setAbout] = useState(about);
  const [Skills, setSkills] = useState(Array.isArray(skills) ? skills : []);
  const [skillsInput, setSkillsInput] = useState((skills || []).join(", "));
  const [ProfileImg, setProfileImg] = useState(profileImg);
  const dispatch = useDispatch();

  const handleEdit = async () => {
  
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const updateProfilePromise = axios.patch(
        BASE_URL + "/profile/edit",
        { 
          name: Name, 
          age: Age, 
          about: About, 
          profileImg: ProfileImg,
          skills: skillsArray
        },
        { withCredentials: true }
      );

      toast.promise(updateProfilePromise, {
        loading: "Updating profile...",
        success: "Profile updated successfully 🎉",
        error: "Failed to update profile ❌",
      });

      const res = await updateProfilePromise;
      dispatch(addUser(res.data));
      setSkills(skillsArray);
    } catch (err) {
      // Extract backend error message if available
      const msg =
        err.response?.data ||
        err.message ||
        "Unexpected error. Please try again.";
      toast.error(msg);
      console.error("Profile update error:", msg);
    }
  };

  return (
    <div className="justify-center items-center flex">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Edit profile</h2>

          <input
            type="text"
            placeholder="name"
            className="input input-neutral"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="age"
            className="input input-primary"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="profileImgUrl"
            className="input input-secondary"
            value={ProfileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
          <input
            type="text"
            placeholder="skills (comma separated)"
            className="input input-accent"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
          />

          <textarea
            className="textarea"
            placeholder="About"
            value={About}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <Feed
          user={{
            name: Name,
            age: Age,
            about: About,
            skills: Skills,
            profileImg: ProfileImg,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
