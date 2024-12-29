"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  type: string;
  date: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((transaction, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{transaction.type}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p
                className={`font-medium ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
