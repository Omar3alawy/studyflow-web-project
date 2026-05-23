function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold text-primary">
            Organize Your College Tasks Easily
          </h1>

          <p className="lead mt-3">
            StudyFlow helps students keep track of their study tasks, subjects,
            deadlines, and priorities in one simple place.
          </p>

          <p>
            Add your tasks, choose their priority, and manage your academic work
            without keeping everything in scattered notes.
          </p>

          <a href="/tasks" className="btn btn-primary btn-lg mt-3">
            Start Managing Tasks
          </a>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="home-box shadow">
            <h4 className="fw-bold text-primary">Stay Organized</h4>
            <p className="mb-0">
              A simple way to plan your college work and avoid missing important
              deadlines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;