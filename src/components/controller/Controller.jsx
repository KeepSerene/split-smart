import "./controller.css";

// Icon imports
import iconDollar from "/images/icon-dollar.svg";
import iconPerson from "/images/icon-person.svg";

// React imports
import { useRef } from "react";

const Controller = ({
  billAmount,
  setBillAmount,
  setSelectedTipAmt,
  peopleNum,
  setPeopleNum,
  tipInputResetRef,
}) => {
  const radioInputRefs = useRef([]);
  const customTipInputRef = useRef();

  const handleRadioInput = (event) => {
    // Clear the custom input field entry (if any) when a radio-input is selected
    if (customTipInputRef.current) customTipInputRef.current.value = "";

    setSelectedTipAmt(+event.target.value);
  };

  const handleCustomInput = (event) => {
    // Clear the previous radio-input selection (if any)
    radioInputRefs.current.forEach((radioInputRef) => {
      if (radioInputRef) radioInputRef.checked = false;
    });

    const customTipValue = event.target.value;

    if (customTipValue === "") setSelectedTipAmt(0);
    else setSelectedTipAmt(+customTipValue / 100);
  };

  // Define the reset function for tip-inputs
  const resetTipInputs = () => {
    radioInputRefs.current.forEach((radioInputRef) => {
      if (radioInputRef) radioInputRef.checked = false;

      if (customTipInputRef.current) customTipInputRef.current.value = "";
    });
  };

  // Assign the reset function to the ref from App
  tipInputResetRef.current = resetTipInputs;

  return (
    <article className="controller">
      <h2 className="sr-only">Controller</h2>

      <form className="controller-form">
        <div className="input-field">
          <div className="label-wrapper">
            <label htmlFor="bill" className="label">
              Bill
            </label>

            <p className="error-msg">{billAmount === 0 ? "Can't be 0" : ""}</p>
          </div>

          <div className="icon-anchor">
            <input
              type="number"
              id="bill"
              min={0}
              step={0.01}
              onInput={(event) => {
                billAmount === 0
                  ? setBillAmount("")
                  : setBillAmount(+event.target.value);
              }}
              value={billAmount}
              className="number-input"
            />

            <img src={iconDollar} alt="" aria-hidden="true" className="icon" />
          </div>
        </div>

        <div className="tip-section">
          <p className="label">Select tip %</p>

          <div className="tip-options">
            {[0.05, 0.1, 0.15, 0.25, 0.5].map((tipValue, index) => (
              <div key={index} className="tip-option">
                <label htmlFor={`tip${index + 1}`} className="sr-only">
                  Click to select a tip amount of {tipValue * 100}%
                </label>

                <input
                  type="radio"
                  value={tipValue}
                  id={`tip${index + 1}`}
                  name="tip"
                  onInput={handleRadioInput}
                  ref={(elem) => (radioInputRefs.current[index] = elem)}
                />

                <div className="tip-btn">{tipValue * 100}%</div>
              </div>
            ))}

            <label htmlFor="custom-tip" className="sr-only">
              Enter your custom tip amount
            </label>

            <input
              type="number"
              id="custom-tip"
              ref={customTipInputRef}
              min={0}
              step={0.1}
              onInput={handleCustomInput}
              className="number-input"
              placeholder="Custom"
            />
          </div>
        </div>

        <div className="input-field">
          <div className="label-wrapper">
            <label htmlFor="number-of-people" className="label">
              Number of People
            </label>

            <p className="error-msg">{peopleNum === 0 ? "Can't be 0" : ""}</p>
          </div>

          <div className="icon-anchor">
            <input
              type="number"
              id="number-of-people"
              min={0}
              step={1}
              onInput={(event) => {
                peopleNum === 0
                  ? setPeopleNum("")
                  : setPeopleNum(+event.target.value);
              }}
              value={peopleNum}
              className="number-input"
            />

            <img src={iconPerson} alt="" aria-hidden="true" className="icon" />
          </div>
        </div>
      </form>
    </article>
  );
};

export default Controller;
