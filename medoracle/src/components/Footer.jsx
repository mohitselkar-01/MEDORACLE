import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>MEDORACLE</h2>

          <p>AI Clinical Intelligence Platform</p>

          <p className="tagline">
            Empowering healthcare with explainable AI and
            real-time clinical decision support.
          </p>
        </div>

        <div className="footer-links">
          <h3>Platform</h3>

          <a href="/">Clinical AI</a>
          <a href="/">Reports</a>
          <a href="/">Analytics</a>
          <a href="/">Dashboard</a>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <a href="/">About</a>
          <a href="/">Careers</a>
          <a href="/">Blog</a>
          <a href="/">Contact</a>
        </div>

        <div className="footer-links">
          <h3>Legal</h3>

          <a href="/">Privacy Policy</a>
          <a href="/">Terms</a>
          <a href="/">Security</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 MEDORACLE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;