import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Optional minimal state to show selections
  const [ageGroup, setAgeGroup] = useState(""); // user selection placeholder
  const [isSubmitted, setIsSubmitted] = useState(false);

  // These are just examples of issues
  const issues = [
    "Housing affordability",
    "Public transportation",
    "Environmental protection"
  ];

  // Placeholder submit handler
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* Survey title */}
      <h1>Voter Concerns Survey</h1>

      {/* Age group selection */}
      <div>
        <label>Please select your age group:</label>
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="18-25">18-25</option>
          <option value="26-45">26-45</option>
          <option value="46-65">46-65</option>
          <option value="66+">66+</option>
        </select>
      </div>

      {/* Issues with sliders placeholder */}
      <div>
        <h2>Political Issues</h2>
        {issues.map((issue, index) => (
          <div key={index}>
            <p>{issue}</p>
            {/* Slider placeholder */}
            <input type="range" min="1" max="10" />
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>

      {/* Feedback placeholder */}
      {isSubmitted && <p>Thank you for participating!</p>}
    </div>
  );
}

export default App;
