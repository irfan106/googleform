import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import Questions from './components/question.jsx';
const defaultDetails = {
  "__fullName": "",
  "__email": "",
  "__age": "",
  "__education": "",
  "__institute": "",
  "__branch": "",
  "__canada_institite": "",
  "__country": "",
  "__goals": "",
  "__escore_listening": "",
  "__escore_reading": "",
  "__escore_speaking": "",
  "__escore_writing": "",
  "__paid_your_tuition_fees": "",
  "__tuition_fees": "",
  "__gic": "",
  "__gic_pay": "",
};
function App() {

  const [Details, setDetails] = useState(defaultDetails);

  function handleInputs(e) {
    setDetails({ ...Details, [e.target.id]: e.target.value });
  }
  function Reset() {
    setDetails(defaultDetails);
    console.log(Details)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Details),
      });

      if (response.ok) {
        console.log('Form1 submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 items-center bg-gray-900 py-10">
        <div className="w-1/2">
          <img className="w-full bg-white rounded-3xl hover:scale-105 transition-all duration-200" src="https://lh6.googleusercontent.com/vHlmJXYwoJzkzWTJP1uGhFgY6sgJPIJCxl1tr5LufmBo8TvIU-EW8QLDYz6udujWDFqtNHbmn_0dVGc35tM--t4B5O2V17TC_BRV1DI6mX_3eYPzsxxIGXGBFgR0_hVQjw=w1020" />
        </div>
        <div className="flex w-full items-center justify-center bg-gray-900">

<form onSubmit={handleSubmit} className="bg-gray-700 w-4/5 mb-20 flex flex-col gap-4 p-12 rounded-3xl shadow-[0px_60px_70px_70px_rgba(0,0,0,0.3)]">
  {
    Questions.map((Qes) => (
      <div key={Qes.id} className="flex flex-col bg-gray-900 gap-4 p-6 rounded-2xl hover:scale-105 transition-all duration-200 hover:shadow-[0px_0px_10px_10px_rgba(0,0,0,0.05)]">
        <label htmlFor={Qes.id} className="text-white text-xl">
          {Qes.label}
        </label>
        <input
          className="p-2 rounded-lg outline-none"
          id={Qes.id}
          type={Qes.type}
          placeholder={Qes.placeholder}
          value={Details[Qes.id]}
          onChange={handleInputs}
          required
        />
      </div>
    ))
  }
  <div className="flex justify-around">
    <button
      className="w-[45%] bg-red-500 p-4 rounded-2xl text-xl font-bold text-white hover:bg-red-600 transition-all duration-200"
      onClick={Reset}
    >
      Reset
    </button>
    <input
      className="w-[45%] bg-green-500 p-4 rounded-2xl text-xl font-bold text-white hover:bg-green-600 transition-all duration-200 hover:cursor-pointer"
      type="submit"
      value="Submit"
    />
  </div>
</form>

        </div>
      </div>
    </>
  );
}
export default App;