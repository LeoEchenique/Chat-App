import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import RingLoader from "react-spinners/RingLoader";

function Avatar() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
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
    setReloadButton("hide show");
  }, [loader]);
  useEffect(() => {
    generateAvatar();
  }, []);

  const saveAvatarProfile = async () => {
    //axios.post to save image on user and finally redirect to chat
    console.log("hi");
  };
  return (
    <div className="avatar-container">
      <h1>Choose an avatar</h1>
      {avatar?.length && loader === false ? (
        avatar.map((avatar, i) => {
          return (
            <img src={avatar} key={i} alt="img" onClick={saveAvatarProfile} />
          );
        })
      ) : (
        <>
          <RingLoader size={150} color={"#ffff"} />
        </>
      )}
      <button className={reloadButton} onClick={generateAvatar}>
        Reload
      </button>
    </div>
  );
}

export default Avatar;
