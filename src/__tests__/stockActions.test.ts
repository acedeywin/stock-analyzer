import { calculateReturns } from '../app//actions/stockActions';
import { StockData, StockReturn } from '../types';

describe('calculateReturns', () => {
  it('calculates daily returns correctly', async () => {
    const mockData: StockData[] = [
      {
        Date: '2023-01-01',
        open: 100,
        high: 110,
        low: 90,
        close: 100,
        volume: 1000,
        ticker: 'AAPL',
      },
      {
        Date: '2023-01-02',
        open: 105,
        high: 115,
        low: 95,
        close: 110,
        volume: 1500,
        ticker: 'AAPL',
      },
      {
        Date: '2023-01-03',
        open: 110,
        high: 120,
        low: 100,
        close: 105,
        volume: 1200,
        ticker: 'AAPL',
      },
    ];

    const result: StockReturn[] = await calculateReturns(mockData);

    expect(result[0].dailyReturn).toBe(0);
    expect(result[1].dailyReturn).toBe(10);
    expect(result[2].dailyReturn).toBeCloseTo(-4.55, 1);
  });
});
