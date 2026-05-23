import { useState } from "react";
import axios from "axios";

function Contact() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactData({
      ...contactData,
      [name]: value
    });
  };

  const validateContact = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactData.name || !contactData.email || !contactData.message) {
      return "Please fill in all contact fields.";
    }

    if (!emailPattern.test(contactData.email)) {
      return "Please enter a valid email address.";
    }

    if (contactData.message.length < 10) {
      return "Message must be at least 10 characters.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationMessage = validateContact();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", contactData);

      setContactData({
        name: "",
        email: "",
        message: ""
      });

      setSuccess("Your feedback was sent successfully.");
    } catch {
      setError("Failed to send feedback.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <h2 className="fw-bold text-primary mb-4">Contact / Feedback</h2>

          <div className="card shadow border-0">
            <div className="card-body">
              <p className="text-muted">
                Use this form to send feedback about the application.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={contactData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="example@email.com"
                    value={contactData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here"
                    value={contactData.message}
                    onChange={handleChange}
                    required
                    minLength="10"
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;