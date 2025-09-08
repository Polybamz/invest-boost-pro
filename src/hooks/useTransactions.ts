import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [investmentsPlan, setInvestmentsPlan] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    // deposit
    const deposit = async (amount: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, type: 'deposit', user: user?.uid }),
            });
            const data = await response.json(); 
            setLoading(false);
            return data;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    };

    // withdraw
    const withdraw = async (amount: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, type: 'withdraw', user: user?.uid }),
            });
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    };

    //make investment
    const makeInvestment = async (planId: string, amount: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/investments/${planId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    };
    // add get investments plan
    useEffect(() => {
        const fetchInvestmentsPlan = async () => {
            try {
                const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/v1/plans', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data);
                setInvestmentsPlan(data);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        }    
        fetchInvestmentsPlan();
        }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setTransactions(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        }    
        fetchTransactions();
        }, []);

    return { transactions, loading, error, investmentsPlan, makeInvestment, deposit, withdraw };
}
