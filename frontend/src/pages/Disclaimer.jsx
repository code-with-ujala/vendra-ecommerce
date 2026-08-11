
import React from "react";
import "../styles/disclaimer.css";

const Disclaimer = () => {
  return (
    <section className="disclaimer-page">
      <div className="disclaimer-container">

        <div className="disclaimer-header">
          <span className="disclaimer-badge">
            VENDRA INFORMATION
          </span>

          <h2 className="disclaimer-title">
            Legal & Site Disclaimer
          </h2>

          <p className="disclaimer-intro">
            Important information about the purpose, content, and usage
            of the Vendra platform.
          </p>
        </div>

        <div className="disclaimer-content">

          <p className="disclaimer-text">
            The data, interfaces, and graphical components represented
            across the Vendra platform are intended solely for educational,
            portfolio, and demonstration purposes. This project showcases
            modern web application architecture and development practices.
          </p>

          <div className="disclaimer-section">
            <div className="disclaimer-number">01</div>

            <div>
              <h4>Accuracy of Materials</h4>

              <p>
                Product information, images, descriptions, and pricing used
                within Vendra may include placeholder or sample content.
                These resources are provided only for learning and
                demonstration purposes and may not represent actual products
                or services.
              </p>
            </div>
          </div>

          <div className="disclaimer-section">
            <div className="disclaimer-number">02</div>

            <div>
              <h4>Payment Processing</h4>

              <p>
                All payment functionality is integrated using Razorpay
                Sandbox credentials. No real financial transactions are
                processed and no actual payment deductions occur while using
                this application.
              </p>
            </div>
          </div>

          <div className="disclaimer-section">
            <div className="disclaimer-number">03</div>

            <div>
              <h4>External Links</h4>

              <p>
                External websites linked from this application are maintained
                by third parties. Vendra is not responsible for the content,
                availability, or privacy practices of those external
                resources.
              </p>
            </div>
          </div>

          <div className="disclaimer-section">
            <div className="disclaimer-number">04</div>

            <div>
              <h4>User Responsibility</h4>

              <p>
                By accessing this application, users acknowledge that the
                project is created for educational and portfolio purposes
                and agree to use it responsibly.
              </p>
            </div>
          </div>

          <p className="disclaimer-footer">
            By continuing to browse this website, you acknowledge and accept
            the terms outlined in this disclaimer.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Disclaimer;

