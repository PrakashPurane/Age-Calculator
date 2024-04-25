import React, { useState } from "react";
import "./Header.css";
import arrowimage from "../../assets/arrowdown.png";

const Header = () => {
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [error, setError] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [ageDays, setAgeDays] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/, ""); // Allow only numbers
    if (name === "years") {
      setYears(numericValue);
    } else if (name === "months") {
      setMonths(numericValue);
    } else if (name === "days") {
      setDays(numericValue);
    }
  };

  const calculateAge = () => {
    if (!years || !months || !days) {
      setError("Please enter your age in years, months, and days.");
      return;
    }

    const yearsNum = parseInt(years, 10);
    const monthsNum = parseInt(months, 10);
    const daysNum = parseInt(days, 10);

    if (yearsNum < 0 || monthsNum < 0 || daysNum < 0) {
      setError("Please enter positive values for age.");
      return;
    }

    if (daysNum < 1 || daysNum > 31) {
      setError("Please enter a valid day (1-31).");
      return;
    }

    if (monthsNum < 1 || monthsNum > 12) {
      setError("Please enter a valid month (1-12).");
      return;
    }

    const today = new Date();
    const dob = new Date(
      today.getFullYear() - yearsNum,
      today.getMonth() - monthsNum,
      today.getDate() - daysNum
    );

    if (dob > today) {
      setError("Please enter a valid age.");
      return;
    }

    const ageInMilliseconds = today - dob;
    const ageDate = new Date(ageInMilliseconds);
    const calcYears = Math.abs(
      ageDate.getUTCFullYear() - today.getUTCFullYear()
    );
    const calcMonths = ageDate.getUTCMonth();
    const calcDays = ageDate.getUTCDate();

    setAgeYears(calcYears);
    setAgeMonths(calcMonths);
    setAgeDays(calcDays);
    setError("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    calculateAge();
  };

  return (
    <>
      <div className="hero">
        <form onSubmit={handleClick}>
          <div className="hero-details">
            <div className="hero-container">
              <label htmlFor="day">DAY</label>
              <input
                type="text"
                placeholder="DD"
                value={days}
                onChange={handleChange}
              />
            </div>

            <div className="hero-container">
              <label htmlFor="month">MONTH</label>
              <input
                type="text"
                placeholder="MM"
                value={months}
                onChange={handleChange}
              />
            </div>

            <div className="hero-container">
              <label htmlFor="year">YEAR</label>
              <input
                type="text"
                placeholder="YY"
                value={years}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="hero-line">
            <img
              className="arrow"
              src={arrowimage}
              alt=""
              onClick={handleClick}
            />
          </div>
        </form>

        {error && <div className="error">{error}</div>}
        {(ageYears || ageMonths || ageDays) && (
          <div className="herobox">
            <div className="hero-year">
              <h1>
                <span> {ageYears}</span> years
              </h1>
            </div>

            <div className="hero-month">
              <h1>
                <span> {ageMonths}</span> months
              </h1>
            </div>

            <div className="hero-day">
              <h1>
                <span>{ageMonths}</span> days
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
