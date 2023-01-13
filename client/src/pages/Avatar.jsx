import React from "react";
import { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import RingLoader from "react-spinners/RingLoader";
function Avatar() {
  const [loader, setLoader] = useState(true);
  const [avatar, setAvatar] = useState([]);
  const generator = new AvatarGenerator();

  const generateAvatar = () => {
    let i = 0;
    let imgs = [];

    while (i < 4) {
      imgs.push(generator.generateRandomAvatar());
      i++;
    }
    setAvatar(imgs);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

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
        avatar.map((avatar, i) => (
          <img src={avatar} key={i} alt="img" onClick={saveAvatarProfile} />
        ))
      ) : (
        <>
          <RingLoader size={150} color={"#ffff"} />
        </>
      )}
      <button onClick={generateAvatar}>Reload</button>
    </div>
  );
}

export default Avatar;
