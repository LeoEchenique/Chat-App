import React from "react";
import Nav from "../components/Nav";
import img from "../assets/chat-img.webp";

function Landing() {
  return (
    <div className="div-container">
      <Nav props={[{li:"Sign in", redirect: "/sign"}, {li:"Sign up", redirect: "/register"}]} />
      <h1>Sign in to chat with your people!</h1>
      <div className="content">
        <div className="text-container">
          <h2>Lorem ipsum dolor sitdolores accusamus voluptati</h2>
          <span>
            Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Eius debitis et ea est vero illo mollitia amet
            reprehenderit, laboriosam nemo, impedit provident minus nulla nihil
            distinctio. Distinctio quas dolores sint. amet consectetur
            adipisicing elit. Facilis optio molestiae assumenda cumque eligendi
            exercitationem placeat sint provident temporibus, voluptatem ad illo
            officia maiores recusandae odit, ducimus atque. Nihil, minus?
          </span>
          <div>
            <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam vel odit eum corrupti optio quod quo, veritatis architecto fuga dignissimos dicta? Sit eaque illo repellendus commodi nobis, harum dignissimos? Placeat.</h2>
          </div>
        </div>
        <div className="card-container">
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veritatis et ullam nam nostrum porro voluptatum vel. Nesciunt quis aperiam quidem quaerat, sequi, sapiente quisquam labore non laboriosam aspernatur sint.
          </p>
          <img src={img} alt="chat-img" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
