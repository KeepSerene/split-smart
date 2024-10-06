import "./display.css";

const Display = ({ perPersonTipAmt, totalAmtPerPerson, handleReset }) => {
  const USDollars = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <article className="display">
      <h2 className="sr-only">Display</h2>

      <div className="row-group">
        <div className="row">
          <div className="label">
            <p className="header">Tip Amount</p>

            <p className="per-person">/ person</p>
          </div>

          <p className="tip-amount">{USDollars.format(perPersonTipAmt)}</p>
        </div>

        <div className="row">
          <div className="label">
            <p className="header">Total</p>

            <p className="per-person">/ person</p>
          </div>

          <p className="tip-amount">{USDollars.format(totalAmtPerPerson)}</p>
        </div>
      </div>

      <button
        type="button"
        disabled={totalAmtPerPerson ? false : true}
        onClick={handleReset}
        className="reset-btn"
      >
        Reset
      </button>
    </article>
  );
};

export default Display;
