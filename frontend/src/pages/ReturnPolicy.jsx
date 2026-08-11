
import React from "react";
import "../styles/returnPolicy.css";

const ReturnPolicy = () => {
  return (
    <section className="return-policy-page">
      <div className="return-policy-container">

        <div className="return-header">
          <span className="return-badge">VENDRA POLICY</span>

          <h2 className="return-title">
            Return & Refund Policy
          </h2>

          <p className="return-intro">
            Your satisfaction matters to us. Please review our return and
            refund guidelines before making a request.
          </p>
        </div>

        <div className="return-content">

          <p className="return-text">
            At Vendra, customer satisfaction is our priority. If you are not
            completely satisfied with your purchase, you may request a return
            within <strong>30 days</strong> of receiving your order, subject
            to the conditions below.
          </p>

          <div className="return-section">
            <div className="section-number">01</div>

            <div>
              <h4>Eligibility for Returns</h4>
              <p>
                Products must be unused, in their original condition, and
                returned with the original packaging. A valid proof of
                purchase or order confirmation is required for all return
                requests.
              </p>
            </div>
          </div>

          <div className="return-section">
            <div className="section-number">02</div>

            <div>
              <h4>Refund Processing</h4>
              <p>
                After your returned item has been received and inspected, we
                will notify you of the approval status. Approved refunds will
                be processed to the original payment method within
                5–7 business days.
              </p>
            </div>
          </div>

          <div className="return-section">
            <div className="section-number">03</div>

            <div>
              <h4>Non-Returnable Items</h4>
              <p>
                Digital products, downloadable software, customized items,
                perishable goods, and products that have been damaged or used
                are not eligible for return or refund.
              </p>
            </div>
          </div>

          <div className="return-section">
            <div className="section-number">04</div>

            <div>
              <h4>Shipping Charges</h4>
              <p>
                Customers are responsible for return shipping costs unless
                the item received is defective or incorrect. Shipping charges
                are non-refundable unless otherwise stated.
              </p>
            </div>
          </div>

          <div className="return-footer">
            By placing an order through Vendra, you acknowledge and agree to
            the terms of this Return & Refund Policy.
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
