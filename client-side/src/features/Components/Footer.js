import React from "react";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="footer footer-dark">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <div>Web design</div>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <div>FPT Co</div>
                </ul>
              </div>
              <div className="col-md-6 item text">
                <h3>TAM Application</h3>
                <p>
                  Application for demonstrating a training activity management
                  application of FPT Co.
                </p>
              </div>
            </div>
            <p className="copyright">TAM Application © 2021</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
