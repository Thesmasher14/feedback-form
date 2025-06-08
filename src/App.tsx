import React, { useState } from 'react';
import './App.css';

interface Feedback {
  name: string;
  email: string;
  feedback: string;
}

function App() {
  const [formData, setFormData] = useState<Feedback>({
    name: '',
    email: '',
    feedback: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');

  const BACKEND_URL = 'http://localhost:5000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    fetch(`${BACKEND_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(() => {
        setFormData({ name: '', email: '', feedback: '' });
        setSuccessMessage('✅ Form submitted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((err) => {
        console.error('Submission failed:', err);
        setSuccessMessage('❌ Failed to submit form. Please try again.');
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  return (
    <div className="page-wrapper">
      <div className="form-feedback-box">
        <div className="form-box">
          <h2>Feedback Form</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>

          {successMessage && (
            <p
              style={{
                marginTop: '10px',
                color: successMessage.startsWith('✅') ? 'green' : 'red',
              }}
            >
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
