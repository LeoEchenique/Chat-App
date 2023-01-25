import React from "react";

function Avatars({ avatars, saveAvatarProfile }) {
  return (
    <>
      {avatars?.length
        ? avatars.map((avatar, i) => {
            return (
              <img
                src={avatar}
                key={i}
                alt="img"
                onClick={(avatar) => saveAvatarProfile(avatar.target.src)}
              />
            );
          })
        : null}
    </>
  );
}

export default Avatars;
