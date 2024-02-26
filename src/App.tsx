import { useState } from "react";
import "./App.css";
import FancyInput from "./components/FancyInput";
import CardInfo from "./components/CardInfo";
import { GoPlus } from "react-icons/go";

export interface Card {
  name: string;
  balance: string;
  minimum: string;
  apr: string;
}

function App() {
  const [budget, setBudget] = useState("");
  const [cards, setCards] = useState([{ name: "", balance: "", minimum: "", apr: "" }]);

  const changeCardHandler = (idx: number, card: Card) => {
    const cardsCopy = [...cards];
    cardsCopy[idx] = {
      name: card.name,
      balance: card.balance,
      minimum: card.minimum,
      apr: card.apr,
    };
    setCards(cardsCopy);
    // console.log(cards);
  };

  const removeCardHandler = (idx: number) => {
    const cardsCopy = [...cards];
    cardsCopy.splice(idx, 1);
    setCards(cardsCopy);
  };

  const addCardHandler = () => {
    const cardsCopy = [...cards];
    cardsCopy.push({ name: "", balance: "", minimum: "", apr: "" });
    setCards(cardsCopy);
  };

  const changeBudgetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
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
      <div className="box">
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
          {cards.map((card, idx) => {
            return (
              <div key={idx}>
                <CardInfo
                  idx={idx}
                  card={card}
                  showRemove={cards.length > 1}
                  onChangeHandler={changeCardHandler}
                  onRemoveHandler={removeCardHandler}
                />
              </div>
            );
          })}
          <button
            className="add-btn"
            type="button"
            onClick={() => {
              addCardHandler();
            }}
          >
            <GoPlus className="add-icon" />
            <span>Add Card</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
