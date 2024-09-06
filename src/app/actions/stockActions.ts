'use server';

import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import { StockData, StockReturn } from '@/types';

/**
 * @function getStockData
 *
 * Retrieves stock data for a specific ticker symbol within a specified date range by reading from a CSV file.
 * This function processes a CSV file containing stock prices and filters the data to include only the records
 * matching the provided ticker symbol and within the provided date range.
 *
 * @param {string} ticker - The stock ticker symbol (e.g., "AAPL" for Apple). It filters the CSV data based on this symbol.
 * @param {string} startDate - The start date in 'YYYY-MM-DD' format. It filters data starting from this date.
 * @param {string} endDate - The end date in 'YYYY-MM-DD' format. It filters data up to this date.
 *
 * @returns {Promise<StockData[]>} - A promise that resolves to an array of `StockData` objects that match the ticker and date range.
 * The promise resolves with the stock data once the CSV file has been fully read and processed, or it rejects with an error if an issue occurs.
 *
 * The function operates asynchronously, leveraging Node.js streams to read the CSV file and the `csv-parser` package to parse the content.
 */
export const getStockData = (
  ticker: string,
  startDate: string,
  endDate: string,
): Promise<StockData[]> => {
  return new Promise((resolve, reject) => {
    // Array to store the filtered results
    const results: StockData[] = [];
    // File path of the CSV containing stock data
    const filePath = path.join(process.cwd(), '', 'stock-prices.csv');

    // Create a readable stream from the CSV file and parse it
    fs.createReadStream(filePath)
      .pipe(csv()) // Pipe the read stream into a CSV parser
      .on('data', (data: StockData) => {
        // Check if the current row matches the provided ticker and is within the date range
        if (data.ticker === ticker && data.Date >= startDate && data.Date <= endDate) {
          // Add the matching row to the results array
          results.push({ ...data });
        }
      })
      .on('end', () => {
        // Once the file is fully read, resolve the promise with the filtered results
        resolve(results);
      })
      .on('error', (err: Error) => {
        // If an error occurs, reject the promise with the error
        reject(err);
      });
  });
};

/**
 * @function calculateReturns
 *
 * Calculates the daily stock returns for a given array of stock data.
 * The return for each day is calculated as the percentage change between the closing prices of the current day
 * and the previous day.
 *
 * @param {StockData[]} stockData - An array of stock data objects. Each object contains information about stock prices
 * for a specific date, including the closing price.
 *
 * @returns {Promise<StockReturn[]>} - A promise that resolves to an array of `StockReturn` objects, where each object
 * contains the original stock data for a given day and the calculated daily return. The first day's return is set to `0`
 * because there is no previous data to compare it to.
 *
 * The function operates asynchronously, although it could be synchronous, and iterates over the stock data to calculate
 * the daily returns for each entry. It returns the list of stock data enriched with daily return percentages.
 */
export const calculateReturns = async (stockData: StockData[]): Promise<StockReturn[]> => {
  const returns: StockReturn[] = [];

  // Loop through each element of the stock data array
  for (let i = 0; i < stockData.length; i++) {
    const current = stockData[i];
    const previous = stockData[i - 1];

    // Calculate the daily return. For the first day, set it to 0 as there is no previous day
    const dailyReturn = i === 0 ? 0 : ((current.close - previous.close) / previous.close) * 100;

    // Add the current stock data along with the calculated daily return to the results array
    returns.push({
      ...current,
      dailyReturn: parseFloat(dailyReturn.toFixed(2)), // Round the daily return to 2 decimal places
    });
  }

  return returns;
};
