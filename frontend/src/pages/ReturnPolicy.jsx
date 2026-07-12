import React from "react";

const textualStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "40px",
  background: "#151515",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 15px 35px rgba(0,0,0,.35)",
  lineHeight: "1.8",
  color: "#b8b8b8",
};

const headingStyle = {
  color: "#fff",
  marginBottom: "20px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  paddingBottom: "15px",
};

const subHeadingStyle = {
  color: "#ff2d2d",
  marginTop: "30px",
  marginBottom: "10px",
};

const ReturnPolicy = () => {
  return (
    <div style={textualStyle}>
      <h2 style={headingStyle}>Return & Refund Policy</h2>

      <p>
        At <strong style={{ color: "#fff" }}>FizCart</strong>, customer
        satisfaction is our priority. If you are not completely satisfied with
        your purchase, you may request a return within <strong>7 days</strong>{" "}
        of receiving your order, subject to the conditions below.
      </p>

      <h4 style={subHeadingStyle}>1. Return Eligibility</h4>

      <p>
        Products are eligible for return if they are:
      </p>

      <ul
        style={{
          paddingLeft: "20px",
          marginBottom: "15px",
        }}
      >
        <li>✔ Unused and in their original condition.</li>
        <li>✔ Returned with the original packaging and accessories.</li>
        <li>✔ Accompanied by the original invoice or proof of purchase.</li>
      </ul>

      <h4 style={subHeadingStyle}>2. Refund Process</h4>

      <p>
        After we receive and inspect the returned product, we will notify you
        about the approval of your refund. Approved refunds will be processed to
        your original payment method within <strong>5–7 business days.</strong>
      </p>

      <h4 style={subHeadingStyle}>3. Non-Returnable Products</h4>

      <p>
        The following items cannot be returned:
      </p>

      <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
        <li>• Digital products or downloadable content.</li>
        <li>• Gift cards.</li>
        <li>• Personal care or hygiene products.</li>
        <li>• Products damaged due to misuse or improper handling.</li>
      </ul>

      <h4 style={subHeadingStyle}>4. Shipping Charges</h4>

      <p>
        Shipping charges are generally non-refundable. If the return is due to
        a damaged, defective, or incorrect product delivered by FizCart, we
        will cover the return shipping cost.
      </p>

      <h4 style={subHeadingStyle}>5. Need Help?</h4>

      <p>
        If you have any questions regarding returns or refunds, please contact
        our support team. We are always happy to assist you.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "18px",
          borderRadius: "12px",
          background: "rgba(255,45,45,.08)",
          border: "1px solid rgba(255,45,45,.25)",
          color: "#fff",
        }}
      >
        <strong>FizCart Support</strong>
        <br />
        📧 support@xyz.com
        <br />
        🌐 xyzadwqeejeqea.com
      </div>
    </div>
  );
};

export default ReturnPolicy;