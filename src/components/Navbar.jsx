import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          StudyFlow
        </Link>

        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light me-2" to="/tasks">
            Tasks
          </Link>

          <Link className="btn btn-outline-light" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;