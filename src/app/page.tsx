'use client';

import React, { useState } from 'react';
import StockForm from '../components/StockForm';
import StockChart from '../components/StockChart';
import StockTable from '../components/StockTable';
import { getStockData, calculateReturns } from './actions/stockActions';
import { StockReturn } from '../types';

const HomePage: React.FC = () => {
  const [stockData, setStockData] = useState<StockReturn[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formValues: {
    ticker: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const data = await getStockData(formValues.ticker, formValues.startDate, formValues.endDate);
      const returns = await calculateReturns(data);

      setStockData(returns);
    } catch (error) {
      setError('Error fetching stock data');
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Stock Price Analyzer and Visualizer</h1>
      <StockForm onSubmit={handleFormSubmit} />
      {!error && stockData && (
        <>
          <StockChart data={stockData} />
          <StockTable data={stockData} />
        </>
      )}
      <p className="text-center text-2xl text-red-500">{error}</p>
    </div>
  );
};

export default HomePage;
