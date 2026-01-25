import { useState } from 'react'
import './App.css'

const API_BASE = "http://127.0.0.1:5000"

const questions = [
  "The government should increase funding for public transportation in Pinellas County.",
  "Local businesses should receive tax incentives to create more jobs in Florida.",
  "The state should invest more in renewable energy sources.",
  "Public schools should receive increased funding for technology and resources.",
  "The minimum wage in Florida should be raised to match the cost of living.",
  "Local law enforcement should receive more funding for community programs.",
  "The county should prioritize affordable housing development.",
  "Environmental regulations should be strengthened to protect Florida's coastlines.",
  "Healthcare services should be more accessible in rural areas of the county.",
  "The government should provide more support for small business owners.",
  "Property taxes should be restructured to benefit long-term residents.",
  "The county should expand mental health services and resources.",
  "Infrastructure spending should prioritize road maintenance and repairs.",
  "Local government should increase transparency in budget decisions.",
  "The state should provide more resources for disaster preparedness."
]

function App() {
<<<<<<< HEAD
  const [answers, setAnswers] = useState(() => {
    let initial = {}
    questions.forEach((q, i) => {
      initial[i] = 5
    })
    return initial
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSlider(index, value) {
    setAnswers(prev => ({
      ...prev,
      [index]: Number(value)
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      responses: questions.map((q, i) => ({
        question: q,
        rating: answers[i]
      })),
      timestamp: new Date().toISOString()
    }

    try {
      console.log('Submitting:', data)
      await new Promise(r => setTimeout(r, 500))
      setSubmitted(true)
    } catch (err) {
      alert('Error submitting survey')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="thankyou">
          <h1>Thank You!</h1>
          <p>Your responses have been recorded.</p>
          <p>Thank you for participating in the Pinellas County community survey.</p>
          <button onClick={() => {
            setSubmitted(false)
            let reset = {}
            questions.forEach((q, i) => reset[i] = 5)
            setAnswers(reset)
          }}>
            Take Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <h1>Community Issues Survey</h1>
        <span className="badge">Pinellas County, Florida</span>
        <p>Rate your agreement with each statement from 1-10</p>
        <div className="scale-info">
          <span>1 = Strongly Disagree</span>
          <span>10 = Strongly Agree</span>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div className="question-box" key={index}>
            <p><strong>{index + 1}.</strong> {question}</p>
            <input
              type="range"
              min="1"
              max="10"
              value={answers[index]}
              onChange={(e) => handleSlider(index, e.target.value)}
            />
            <div className="value-bubble">{answers[index]}</div>
            <div className="tick-marks">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
            </div>
          </div>
        ))}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default App
=======
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
>>>>>>> main
