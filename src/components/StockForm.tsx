'use client';

import { StockFormProps, FormValues } from '@/types';
import { inputDefinition, optionDefinition } from '@/utils/formDefinitions';
import React, { useState } from 'react';

const StockForm: React.FC<StockFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    ticker: '',
    startDate: '',
    endDate: '',
  });

  // Define the specific date range (e.g., January 1, 2023 to April 6, 2023)
  const minDate = '2023-01-01';
  const maxDate = '2023-04-06';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <form action={handleSubmit} className="rounded bg-white p-4 shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Ticker</label>
        <select
          name="ticker"
          value={formValues.ticker}
          onChange={handleChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        >
          {optionDefinition.map((op) => (
            <option key={op.selection} value={op.value}>
              {op.selection}
            </option>
          ))}
        </select>
      </div>

      {inputDefinition.map((ip) => (
        <div key={ip.name} className="mb-4">
          <label className="block text-gray-700">{ip.label}</label>
          <input
            min={minDate}
            max={maxDate}
            type={ip.type}
            name={ip.name}
            value={formValues[ip.name]}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
      ))}

      <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
        Analyze
      </button>
    </form>
  );
};

export default StockForm;
