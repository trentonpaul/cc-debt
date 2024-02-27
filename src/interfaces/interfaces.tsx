export interface CardInput {
  name: string;
  balance: string;
  minimum: string;
  apr: string;
}

export interface Card {
  name: string;
  balance: number;
  minimum: number;
  apr: number;
}

export interface CalculatorInput {
  cards: Card[];
  budget: number;
  strategy: string;
}

export interface CalculatorProps {
  input: CalculatorInput | undefined;
}

export interface CardStep {
  card: Card;
  balance: number;
  payAmount: number;
  interest: number;
}

export interface PayoffStep {
  year: number;
  month: number;
  cardSteps: CardStep[];
}

export interface CardInfoProps {
  idx: number;
  card: CardInput;
  showRemove: boolean;
  onChangeHandler: (idx: number, card: CardInput) => void;
  onRemoveHandler: (idx: number) => void;
}
