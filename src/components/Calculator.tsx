import { useEffect, useState } from "react";
import { CalculatorProps, Card, CardStep, PayoffStep } from "../interfaces/interfaces";
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
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    const daysInMonth = numDays(new Date().getFullYear(), month);

    let balance = input.cards.reduce((acc, card) => {
      return acc + card.balance;
    }, 0);

    const cards = input.cards;
    const budget = input.budget;

    const payoffSteps: PayoffStep[] = [];

    while (balance > 0) {
      let available = budget;

      /* PAYOFF MINIMUMS */
      const cardSteps: CardStep[] = cards.map((card) => {
        // previous balance minus minimum or, if no previous step, the initial card balance
        let payAmount = 0;
        let bal = card.balance;
        if (payoffSteps.length > 0) {
          const lastPayoffStep: CardStep = payoffSteps[payoffSteps.length - 1].cardSteps.find(
            (cardStep) => cardStep.card.name == card.name
          ) as CardStep;
          bal = lastPayoffStep.balance - lastPayoffStep.payAmount;

          if (bal > 0) {
            if (bal < card.minimum) {
              payAmount = bal;
            } else {
              payAmount = card.minimum;
            }
          }
        }
        // payoffSteps.length > 0 ? -card.minimum : card.balance;
        return { card: card, balance: bal, payAmount: payAmount, interest: 0 };
      });

      available -= cardSteps.reduce((acc, cardStep) => {
        return acc + cardStep.payAmount;
      }, 0);

      if (payoffSteps.length > 0)
        balance -= payoffSteps[payoffSteps.length - 1].cardSteps.reduce((acc, cardStep) => {
          return acc + cardStep.payAmount;
        }, 0);

      while (available > 0) {
        const maxApr: Card = cards.reduce((card1, card2) => {
          return card1.apr > card2.apr ? card1 : card2;
        }, cards[0]);

        const maxCardStep = cardSteps.find((cardStep) => {
          return cardStep.card.name == maxApr.name;
        }) as CardStep;

        // maxCardStep.
      }

      console.log(balance);

      payoffSteps.push({ cardSteps: cardSteps, year: year, month: month });

      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
    }
    console.log(payoffSteps);
  }, [input]);

  if (!input) {
    return <></>;
  }

  return <div className="calculator"></div>;
}

export default Calculator;
