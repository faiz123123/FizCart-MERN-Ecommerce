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

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2 style={headingStyle}>Disclaimer</h2>

      <p>
        Welcome to <strong style={{ color: "#fff" }}>FizCart</strong>. This
        website has been developed as a learning and portfolio project to
        demonstrate modern full-stack web development using the MERN Stack.
      </p>

      <h4 style={subHeadingStyle}>1. Educational Purpose</h4>

      <p>
        FizCart is intended for educational and demonstration purposes. Product
        information, images, prices, and descriptions may be used as sample
        content and should not always be considered real or commercially
        available.
      </p>

      <h4 style={subHeadingStyle}>2. Product Information</h4>

      <p>
        While we strive to display accurate information, we do not guarantee
        that all product descriptions, images, pricing, or availability are
        free from errors. Information may change without prior notice.
      </p>

      <h4 style={subHeadingStyle}>3. Payments</h4>

      <p>
        If this project is running in a testing environment, payment processing
        is performed using sandbox or test gateways. No real financial
        transactions are processed unless explicitly stated.
      </p>

      <h4 style={subHeadingStyle}>4. External Links</h4>

      <p>
        FizCart may contain links to third-party websites for additional
        information or services. We are not responsible for the content,
        security, or privacy practices of those external websites.
      </p>

      <h4 style={subHeadingStyle}>5. Limitation of Liability</h4>

      <p>
        FizCart and its developer shall not be held responsible for any direct
        or indirect damages arising from the use of this website or reliance on
        the information provided.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "18px",
          background: "rgba(255,45,45,.08)",
          border: "1px solid rgba(255,45,45,.25)",
          borderRadius: "12px",
          color: "#fff",
        }}
      >
        <strong>Note:</strong> By accessing and using FizCart, you acknowledge
        that you have read and understood this disclaimer and agree to its
        terms.
      </div>
    </div>
  );
};

export default Disclaimer;