import React from "react";
import face from "../../assets/bgface.png";

function About() {
  return (
    <div className="top">
      <div className="navwidth">
        <div className="welcomeflex">
          <div className="faceimg">
            <img src={face} alt="none" />
          </div>
          <div className="abouttext">
            <h3>Welcome To</h3>
            <h1>StyStudio</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nibh dolor, gravida faucibus dolor consectetur, pulvinar rhoncus
              risus. Fusce vel rutrum mi. Suspendisse pretium tellus eu ipsum
              pellentesque convallis. Ut mollis libero eu massa imperdiet
              faucibus vitae non diam. Sed egestas felis libero, ut suscipit
              nisl varius non. Proin eget suscipit nulla. Nulla facilisi. In hac
              habitasse platea dictumst.
            </p>
            <button className="btn">Read more</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
