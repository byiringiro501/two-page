
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Manage student information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  // Manage search input
  const [search, setSearch] = useState("");

  // Manage navigation between two pages
  const [page, setPage] = useState("registration");

  // Manage the second page's two input fields
  const [firstData, setFirstData] = useState("");
  const [secondData, setSecondData] = useState("");
  const [result, setResult] = useState(null);

  // Display welcome message when application loads
  useEffect(() => {
    alert("Welcome to Student Management System!");
  }, []);

  // Submit student registration form
  function handleSubmit(e) {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      name: name,
      age: age,
      course: course,
    };

    setStudents([...students, newStudent]);

    setName("");
    setAge("");
    setCourse("");
  }

  // Display second page's data
  function handleSecondSubmit(e) {
    e.preventDefault();

    setResult({
      firstData: firstData,
      secondData: secondData,
    });
  }

  // Search students by name
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* Navigation */}
      <nav>
        <button onClick={() => setPage("registration")}>
          Registration Page
        </button>

        <button onClick={() => setPage("second")}>
          Second Page
        </button>
      </nav>

      {/* Page One */}
      {page === "registration" && (
        <section>
          <h2>Student Registration Form</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Enter student age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              required
            />

            <input
              type="text"
              placeholder="Enter student course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <button type="submit">Register Student</button>
          </form>

          <h2>Search Student</h2>

          <input
            type="text"
            placeholder="Search student by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h2>Registered Students</h2>

          {filteredStudents.length === 0 ? (
            <p>No students found.</p>
          ) : (
            filteredStudents.map((student) => (
              <div className="result" key={student.id}>
                <p>Name: {student.name}</p>
                <p>Age: {student.age}</p>
                <p>Course: {student.course}</p>
              </div>
            ))
          )}
        </section>
      )}

      {/* Page Two */}
      {page === "second" && (
        <section>
          <h2>Second Page - Enter Data</h2>

          <form onSubmit={handleSecondSubmit}>
            <input
              type="text"
              placeholder="Enter first data"
              value={firstData}
              onChange={(e) => setFirstData(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter second data"
              value={secondData}
              onChange={(e) => setSecondData(e.target.value)}
              required
            />

            <button type="submit">Display Data</button>
          </form>

          {result && (
            <div className="result">
              <h3>Entered Information</h3>
              <p>First Data: {result.firstData}</p>
              <p>Second Data: {result.secondData}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
