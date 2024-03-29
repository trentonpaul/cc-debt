import { useState } from "react";
import "./App.css";
import FancyInput from "./components/FancyInput";
import CardInfo from "./components/CardInfo";
import { GoPlus } from "react-icons/go";
import Dropdown from "./components/Dropdown";
import Calculator from "./components/Calculator";
import { CalculatorInput, Card, CardInput } from "./interfaces/interfaces";

function App() {
  const [budget, setBudget] = useState<string>("");
  const [cardInputs, setCardInputs] = useState<CardInput[]>([
    { name: "", balance: "", minimum: "", apr: "" },
  ]);
  const [calculatorInput, setCalculatorInput] = useState<CalculatorInput>();
  const [strategy, setStrategy] = useState<number>(0);

  const strategies = ["Debt Avalanche", "Debt Snowball"];

  const changeStrategyHandler = (idx: number) => {
    setStrategy(idx);
  };

  const changeCardHandler = (idx: number, card: CardInput) => {
    const cardsCopy = [...cardInputs];
    cardsCopy[idx] = {
      name: card.name,
      balance: card.balance,
      minimum: card.minimum,
      apr: card.apr,
    };
    setCardInputs(cardsCopy);
    // console.log(cards);
  };

  const removeCardHandler = (idx: number) => {
    const cardsCopy = [...cardInputs];
    cardsCopy.splice(idx, 1);
    setCardInputs(cardsCopy);
  };

  const addCardHandler = () => {
    const cardsCopy = [...cardInputs];
    cardsCopy.push({ name: "", balance: "", minimum: "", apr: "" });
    setCardInputs(cardsCopy);
  };

  const changeBudgetHandler = (str: string) => {
    setBudget(str);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const newCards: Card[] = cardInputs.map((card) => {
      return {
        name: card.name,
        balance: Number(card.balance),
        minimum: Number(card.minimum),
        apr: Number(card.apr) / 100,
      };
    });
    setCalculatorInput({
      cards: newCards,
      budget: Number(budget),
      strategy: strategies[strategy],
    });
    e.preventDefault();
  };

  return (
    <>
      <div className="hero">
        <div className="box">
          <h1 className="title">Credit Card Payoff Calculator</h1>
          <p className="attribution">
            by <span>Trenton Paul</span>
          </p>
        </div>
      </div>
      <form className="box" onSubmit={formSubmitHandler}>
        <p className="hint">
          Credit card debt can be overbearing and even scary, but this simple tool will help find
          you the best payoff strategy. Get started with the steps below.
        </p>
        <div className="step">
          <h3>Step 1: Set Your Monthly Budget</h3>
          <p className="hint">
            This is the amount of money per month that you will dedicate towards paying off your
            cards. The more you put forward, the less you'll pay overall.
          </p>
          <div className="budget-box">
            <p>Enter your monthly budget:</p>
            <FancyInput
              value={budget}
              tag="$"
              type="number"
              onChangeHandler={changeBudgetHandler}
            />
          </div>
        </div>
        <div className="step">
          <h3>Step 2: List Your Cards</h3>
          <p className="hint">
            Enter the following information to estimate your payoff schedule. None of this data is
            collected, and all of this is processed right here within this page.
          </p>
          <div className="cards">
            {cardInputs.map((card, idx) => {
              return (
                <div key={idx}>
                  <CardInfo
                    idx={idx}
                    card={card}
                    showRemove={cardInputs.length > 1}
                    onChangeHandler={changeCardHandler}
                    onRemoveHandler={removeCardHandler}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="add-btn"
            type="button"
            disabled={cardInputs.length >= 10}
            onClick={() => {
              addCardHandler();
            }}
          >
            <GoPlus className="add-icon" />
            <span>Add Card</span>
          </button>
        </div>
        <div className="step">
          <h3>Step 3: Pick Your Strategy</h3>
          <p className="hint">
            There are several common payoff strategies, but Debt Avalanche and Debt Snowball are the
            most common.
          </p>
          <div className="budget-box">
            <p>Select your payoff strategy:</p>
            <Dropdown
              options={strategies}
              selected={strategy}
              setSelected={changeStrategyHandler}
            />
          </div>
        </div>
        <div className="step">
          <h3>Step 4: Calculate</h3>
          <button className="add-btn" type="submit">
            <span>Calculate</span>
          </button>
        </div>
      </form>
      <div className="box">
        <Calculator input={calculatorInput} />
      </div>
    </>
  );
}

export default App;
