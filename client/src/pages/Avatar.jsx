import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import RingLoader from "react-spinners/RingLoader";
/* import { instance } from "../instance/instance"; */
import { auth_instance } from "../instance/instance";
import axios from "axios";
import Avatars from "../components/Avatars";

function Avatar({ props }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const generator = new AvatarGenerator();
  const [reloadButton, setReloadButton] = useState("hide");

  const generateAvatar = async () => {
    let imgs = [];
    let i = 0;
    while (i < 4) {
      i++;
      generator.generateRandomAvatar();
      imgs.push(generator.generateRandomAvatar());
    }
    setAvatar(imgs);
    setLoader(false);
  };
  useEffect(() => {
    avatar.length > 2 && setReloadButton("hide show");
  }, [avatar]);
  useEffect(() => {
    setLoader(true);
    generateAvatar();
  }, []);

  const saveAvatarProfile = async (avatarImg) => {
    //axios.post to save image on user and finally redirect to chat or dashboard
    // auth_instance now works so need to change the endpoint as well
    auth_instance(localStorage.getItem("token"))
      .put(`/log/register/avatar`, { avatarImg })
      .then((res) => {
        return res.status === 200 ? navigate("/chat") : null;
      });
  };
  return (
    <div className="avatar-container">
      <div className="title-avatar">
        <h1>Choose an avatar</h1>
      </div>
      <div className="img-container">
        {avatar?.length && loader === false ? (
          <Avatars avatars={avatar} saveAvatarProfile={saveAvatarProfile} />
        ) : (
          <>
            <RingLoader size={150} color={"#ffff"} />
          </>
        )}
      </div>
      <button className={`${reloadButton} btn-reg`} onClick={generateAvatar}>
        Reload
      </button>
    </div>
  );
}

export default Avatar;
