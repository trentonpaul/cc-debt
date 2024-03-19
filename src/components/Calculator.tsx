import { useEffect, useState } from "react";
import { CalculatorProps, Card, CardStep, PayoffStep } from "../interfaces/interfaces";
import "../styles/module.Calculator.css";
import PieChart from "./PieChart";

function Calculator({ input }: CalculatorProps) {
  const [payoffSteps, setPayoffSteps] = useState<PayoffStep[]>([]);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatCurrency = (amount: number) => {
    if (amount <= 0) {
      return "-";
    } else {
      return USDollar.format(amount);
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /* ON INPUT CHANGE */
  useEffect(() => {
    if (!input) return;

    const numDays = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    let balance = input.cards.reduce((acc, card) => {
      return acc + card.balance;
    }, 0);

    const cards = input.cards;
    const budget = input.budget;

    const payoffSteps: PayoffStep[] = [];

    while (balance > 0.01) {
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
          bal = lastPayoffStep.balance + lastPayoffStep.interest - lastPayoffStep.payAmount;

          if (bal > 0) {
            if (bal < card.minimum) {
              payAmount = bal;
            } else {
              payAmount = card.minimum;
            }
          }
        } else {
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

      /* SUBSTRACT PAYMENTS FROM available */
      available -= cardSteps.reduce((acc, cardStep) => {
        return acc + cardStep.payAmount;
      }, 0);

      // if (payoffSteps.length > 0)
      //   balance -= payoffSteps[payoffSteps.length - 1].cardSteps.reduce((acc, cardStep) => {
      //     return acc + cardStep.payAmount;
      //   }, 0);

      let remainingCards: Card[] = cards;

      if (payoffSteps.length > 0) {
        remainingCards = cardSteps
          .filter((cardStep) => {
            return cardStep.balance - cardStep.payAmount > 0;
          })
          .map((cardStep) => cardStep.card);
      }

      while (remainingCards.length > 0 && available >= 0.01) {
        let idealCard: Card;

        if (input.strategy == "Debt Avalanche") {
          idealCard = remainingCards.reduce((card1, card2) => {
            return card1.apr > card2.apr ? card1 : card2;
          }, remainingCards[0]);
        } else {
          idealCard = remainingCards.reduce((card1, card2) => {
            return card1.balance < card2.balance ? card1 : card2;
          }, remainingCards[0]);
        }

        const maxCardStep = cardSteps.find((cardStep) => {
          return cardStep.card.name == idealCard.name;
        }) as CardStep;

        const bal = maxCardStep.balance - maxCardStep.payAmount;

        const payable = Math.min(available, bal);

        maxCardStep.payAmount += payable;

        available -= payable;

        remainingCards = cardSteps
          .filter((cardStep) => {
            return cardStep.balance - cardStep.payAmount > 0;
          })
          .map((cardStep) => cardStep.card);
      }

      const daysInMonth = numDays(new Date().getFullYear(), month);

      /* CALCULATE INTEREST */
      cardSteps.forEach((cardStep) => {
        const effectiveApr = cardStep.card.apr / 365;
        let interest =
          cardStep.balance /* - cardStep.payAmount / 2*/ *
          (Math.pow(1 + (effectiveApr * daysInMonth) / 365, 365) - 1);
        if (interest < 0.01) {
          interest = 0;
        }
        if (cardStep.balance - cardStep.payAmount == 0) {
          interest = 0;
        }
        cardStep.interest = interest;
      });

      balance = cardSteps.reduce((acc, cardStep) => {
        return acc + cardStep.balance;
      }, 0);

      console.log(balance);
      console.log(cardSteps);

      // balance -= cardSteps.reduce((acc, cardStep) => {
      //   return acc + cardStep.payAmount;
      // }, 0);

      payoffSteps.push({ cardSteps: cardSteps, year: year, month: month });

      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
    }
    console.log(payoffSteps);
    setPayoffSteps(payoffSteps);
  }, [input]);

  if (!input) {
    return <></>;
  }

  return (
    <div className="calculator">
      <h3 className="results-header">Results</h3>
      <div className="results-container">
        <table className="results">
          <tr>
            <th>Month</th>
            {input.cards.map((card) => {
              return <th>{card.name}</th>;
            })}
            <th>Interest</th>
            <th>Balance</th>
            <th>Payments</th>
          </tr>
          {payoffSteps.map((step) => {
            const totalInterest = formatCurrency(
              step.cardSteps.reduce((acc, cardStep) => {
                return acc + cardStep.interest;
              }, 0)
            );
            const totalBalance = formatCurrency(
              step.cardSteps.reduce((acc, cardStep) => {
                return acc + cardStep.balance;
              }, 0)
            );
            const totalPayments = formatCurrency(
              step.cardSteps.reduce((acc, cardStep) => {
                return acc + cardStep.payAmount;
              }, 0)
            );
            return (
              <tr>
                <td>{months[step.month] + " " + step.year}</td>
                {step.cardSteps.map((cardStep) => {
                  return <td>{formatCurrency(cardStep.payAmount)}</td>;
                })}
                <td>{totalInterest}</td>
                <td>{totalBalance}</td>
                <td>{totalPayments}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <PieChart
        balance={input.cards.reduce((acc, card) => {
          return acc + card.balance;
        }, 0)}
        interest={payoffSteps.reduce((payoffAcc, payoffStep) => {
          return (
            payoffAcc +
            payoffStep.cardSteps.reduce((cardstepAcc, cardStep) => {
              return cardstepAcc + cardStep.interest;
            }, 0)
          );
        }, 0)}
        width={300}
        height={230}
        title="Principal and Interest"
      />
    </div>
  );
}

export default Calculator;
1;
