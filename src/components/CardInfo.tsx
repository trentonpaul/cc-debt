import { Card } from "../App";
import FancyInput from "./FancyInput";
import "../styles/module.CardInfo.css";
import { GoX } from "react-icons/go";

interface CardInfoProps {
  idx: number;
  card: Card;
  showRemove: boolean;
  onChangeHandler: (idx: number, card: Card) => void;
  onRemoveHandler: (idx: number) => void;
}

function CardInfo({ idx, card, showRemove, onChangeHandler, onRemoveHandler }: CardInfoProps) {
  const nameId = idx + "name";
  const balanceId = idx + "balance";
  const minimumId = idx + "minimum";
  const aprId = idx + "apr";

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    card.name = e.target.value;
    onChangeHandler(idx, card);
  };

  const changeBalanceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    card.balance = e.target.value;
    onChangeHandler(idx, card);
  };

  const changeMinimumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    card.minimum = e.target.value;
    onChangeHandler(idx, card);
  };

  const changeAprHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    card.apr = e.target.value;
    onChangeHandler(idx, card);
  };

  return (
    <div className="card-info-wrapper">
      <div className="num-label">
        <p>{idx + 1}.</p>
      </div>
      <div className="card-info">
        <div className="input-group">
          <label htmlFor={nameId}>Credit Card Name</label>
          <FancyInput id={nameId} value={card.name} onChangeHandler={changeNameHandler} />
        </div>
        <div className="input-group">
          <label htmlFor={balanceId}>Balance</label>
          <FancyInput
            id={balanceId}
            value={card.balance}
            tag="$"
            type="number"
            onChangeHandler={changeBalanceHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor={minimumId}>Minimum Payment</label>
          <FancyInput
            id={minimumId}
            value={card.minimum}
            tag="$"
            type="number"
            onChangeHandler={changeMinimumHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor={aprId}>APR</label>
          <FancyInput
            id={aprId}
            value={card.apr}
            tag="%"
            type="number"
            onChangeHandler={changeAprHandler}
          />
        </div>
      </div>
      {showRemove ? (
        <button
          className="remove-btn"
          type="button"
          onClick={() => {
            onRemoveHandler(idx);
          }}
        >
          <GoX className="remove-icon" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardInfo;
