import "./app.css";

// Logo icon import
import logo from "/images/logo.svg";

// Component imports
import Controller from "./components/controller/Controller";
import Display from "./components/display/Display";

// React imports
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [billAmount, setBillAmount] = useState("");
  const [selectedTipAmt, setSelectedTipAmt] = useState("");
  const [peopleNum, setPeopleNum] = useState("");
  const [perPersonTipAmt, setPerPersonTipAmt] = useState(0);
  const [totalAmtPerPerson, setTotalAmtPerPerson] = useState(0);

  useEffect(() => {
    if (billAmount * selectedTipAmt * peopleNum > 0) {
      setPerPersonTipAmt((billAmount * selectedTipAmt) / peopleNum);
      setTotalAmtPerPerson(perPersonTipAmt + billAmount / peopleNum);
    }
  }, [billAmount, selectedTipAmt, peopleNum, perPersonTipAmt]);

  // Create a ref to hold the tip-input's (both radio-input & custom-tip) reset function
  const tipInputResetRef = useRef();

  const handleReset = () => {
    setBillAmount("");
    setSelectedTipAmt("");
    setPeopleNum("");
    setPerPersonTipAmt(0);
    setTotalAmtPerPerson(0);

    // Call the tip-input's reset function
    if (tipInputResetRef.current) tipInputResetRef.current();
  };

  return (
    <div className="app">
      <img src={logo} alt="Splitter logo" className="logo" />

      <div className="wrapper">
        <Controller
          billAmount={billAmount}
          setBillAmount={setBillAmount}
          setSelectedTipAmt={setSelectedTipAmt}
          peopleNum={peopleNum}
          setPeopleNum={setPeopleNum}
          tipInputResetRef={tipInputResetRef}
        />

        <Display
          perPersonTipAmt={perPersonTipAmt}
          totalAmtPerPerson={totalAmtPerPerson}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default App;
