import "./footer.css";

export default function Footer() {
  return (
    <footer style={{ background: "#333", color: "#fff", padding: "40px 0", marginTop: "auto" }}>
      <div className="box-container" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        
        <div className="box">
          <h3>Quick links</h3>
          <a href="#home">Home</a><br />
          <a href="#faq">FAQ</a><br />
          <a href="#contact">Contact</a>
        </div>

        <div className="box">
          <h3>Extra links</h3>
          <a href="#contact">Ask questions</a><br />
          <a href="#">Terms of use</a><br />
          <a href="#">Privacy policy</a>
        </div>

        <div className="box">
          <h3>Contact Info</h3>
          <a href="tel:+919172010257">📞 +91 9172010257</a><br />
          <a href="mailto:hemantpatil17072004@gmail.com">✉ hemantpatil17072004@gmail.com</a><br />
          <a href="#">📍 Nashik, India - 422003</a>
        </div>

        <div className="box">
          <h3>Follow us</h3>
          <a href="https://www.facebook.com/HemantPatil">Facebook</a><br />
          <a href="https://www.instagram.com/hemant_17_7">Instagram</a><br />
          <a href="https://www.linkedin.com/in/hemant-patil-5a7b501b8/">LinkedIn</a><br />
          <a href="https://github.com/Hemant177">GitHub</a>
        </div>

      </div>

      <div style={{ textAlign: "center", marginTop: "1px" }}>
        Created by <span>Hemant Patil</span> | All rights reserved!
      </div>
    </footer>
  );
}
 