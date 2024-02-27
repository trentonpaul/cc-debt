import { useEffect, useState } from "react";
import { CalculatorProps, PayoffStep } from "../interfaces/interfaces";
import "../styles/module.Calculator.css";

function Calculator({ input }: CalculatorProps) {
  const [payoffSteps, setPayoffSteps] = useState<PayoffStep[]>([]);

  /* ON INPUT CHANGE */
  useEffect(() => {
    if (!input) return;

    const numDays = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const today = Date();
    const month = new Date().getMonth();
    console.log("HI" + numDays(new Date().getFullYear(), month));

    let balance = input.cards.reduce((acc, card) => {
      return acc + card.balance;
    }, 0);

    const cards = input.cards;
    const budget = input.budget;

    while (balance > 0) {
      console.log(balance);
      balance = Math.max(0, balance - budget);
    }

    console.log(balance);
  }, [input]);

  if (!input) {
    return <></>;
  }

  return <div className="calculator"></div>;
}

export default Calculator;
