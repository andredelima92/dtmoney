import {
  createContext,
  ReactComponentElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { api } from "./services/api";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  createdAt: string;
  category: string;
};

type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
