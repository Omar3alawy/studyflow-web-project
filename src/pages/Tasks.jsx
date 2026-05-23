import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "",
    priority: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch {
      setError("Could not load tasks from the database.");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateTask = () => {
    if (
      !formData.title ||
      !formData.subject ||
      !formData.deadline ||
      !formData.priority
    ) {
      return "Please fill in all task fields.";
    }

    if (formData.title.length < 3) {
      return "Task title must be at least 3 characters.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationMessage = validateTask();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", formData);

      setFormData({
        title: "",
        subject: "",
        deadline: "",
        priority: ""
      });

      setSuccess("Task added successfully.");
      getTasks();
    } catch {
      setError("Failed to add task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      getTasks();
    } catch {
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">My Study Tasks</h2>

      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h4 className="card-title mb-3">Add New Task</h4>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Example: Study React components"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    minLength="3"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Example: Web Engineering"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    className="form-control"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    name="priority"
                    className="form-select"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Save Task
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="row">
            {tasks.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info">No tasks saved yet.</div>
              </div>
            ) : (
              tasks.map((task) => (
                <div className="col-md-6 mb-3" key={task.id}>
                  <div className="card h-100 shadow-sm task-card">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{task.title}</h5>

                      <p className="mb-1">
                        <strong>Subject:</strong> {task.subject}
                      </p>

                      <p className="mb-1">
                        <strong>Deadline:</strong> {task.deadline}
                      </p>

                      <p className="mb-3">
                        <strong>Priority:</strong> {task.priority}
                      </p>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;