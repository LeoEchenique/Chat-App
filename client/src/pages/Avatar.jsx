import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import RingLoader from "react-spinners/RingLoader";
import { instance } from "../instance/instance";
import axios from "axios";

function Avatar({ props }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const generator = new AvatarGenerator();
  const [reloadButton, setReloadButton] = useState("hide");
  let { id } = useParams();
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
    //axios.post to save image on user and finally redirect to chat
    // use instance file to export endpoint http
    axios
      .put(`${instance}/log/register/avatar?avatarImg=${avatarImg}&id=${id}`)
      .then((res) => (res.status === 200 ? navigate("/chat") : null));
  };
  return (
    <div className="avatar-container">
      <div className="title-avatar">
        <h1>Choose an avatar</h1>
      </div>
      <div className="img-container">
        {avatar?.length && loader === false ? (
          avatar.map((avatar, i) => {
            return (
              <img
                src={avatar}
                key={i}
                alt="img"
                onClick={() => saveAvatarProfile(avatar)}
              />
            );
          })
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
