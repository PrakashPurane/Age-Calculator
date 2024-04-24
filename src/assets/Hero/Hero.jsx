import React, { useState } from "react";
import "./Hero.css";
import arrowimage from "../../assets/arrowdown.png";

const Hero = () => {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState([]);
  const [validatedDay, setValidatedDay] = useState(null);
  const [validatedMonth, setValidatedMonth] = useState(null);
  const [validatedYear, setValidatedYear] = useState(null);
  const [displayResult, setDisplayResult] = useState(false);

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
      setDay(value);
    }
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 12)) {
      setMonth(value);
    }
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    if (
      value === "" ||
      (parseInt(value) >= 0 && parseInt(value) <= currentYear)
    ) {
      setYear(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    const newErrors = [];

    if (!day || !month || !year) {
      newErrors.push("Any field is empty");
    } else {
      const isLeapYear =
        (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
      const maxDaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      if (
        isNaN(dayNum) ||
        dayNum < 1 ||
        dayNum > maxDaysInMonth[monthNum - 1]
      ) {
        newErrors.push("Invalid day");
      }

      if (isNaN(monthNum) || monthNum < 0 || monthNum > 12) {
        newErrors.push("Invalid month");
      }

      if (isNaN(yearNum) || yearNum < 0 || yearNum > currentYear) {
        newErrors.push("Invalid year");
      }
      if (newErrors.length === 0) {
        setValidatedDay(dayNum);
        setValidatedMonth(monthNum);
        setValidatedYear(yearNum);
        setDisplayResult(true);
      } else {
        setValidatedDay(null);
        setValidatedMonth(null);
        setValidatedYear(null);
        setDisplayResult(false);
      }
    }
    setErrors(newErrors);
  };

  const handleArrowClick = () => {
    if (displayResult) {
      setDisplayResult(false);
    } else {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <>
      <div className="hero">
        <form onSubmit={handleSubmit}>
          <div className="hero-details">
            <div className="hero-container">
              <label htmlFor="day">DAY</label>
              <input
                type="text"
                placeholder="DD"
                value={day}
                onChange={handleDayChange}
              />
            </div>

            <div className="hero-container">
              <label htmlFor="month">MONTH</label>
              <input
                type="text"
                placeholder="MM"
                value={month}
                onChange={handleMonthChange}
              />
            </div>

            <div className="hero-container">
              <label htmlFor="year">YEAR</label>
              <input
                type="text"
                placeholder="YY"
                value={year}
                onChange={handleYearChange}
              />
            </div>
          </div>

          <div className="hero-line">
            <img
              className="arrow"
              src={arrowimage}
              alt=""
              onClick={handleArrowClick}
            />
          </div>
        </form>

        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => {
              <p key={index}>{error}</p>;
            })}
          </div>
        )}
        {displayResult && (
          <div className="herobox">
            <div className="hero-year">
              <h1>
               
                <span> {validatedYear}</span> years
              </h1>
            </div>

            <div className="hero-month">
              <h1>
              
                <span> {validatedMonth}</span> months
              </h1>
            </div>

            <div className="hero-day">
              <h1>
                <span>{validatedDay}</span> days
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
