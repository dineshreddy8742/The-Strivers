'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AnalysisCharts({ results }: { results: any }) {
  if (!results) {
    return null;
  }

  const data = [
    {
      name: 'CO₂ Emissions',
      value: results.total_co2,
    },
    {
      name: 'Water Usage',
      value: results.water_use,
    },
    {
      name: 'Land Use',
      value: results.land_use,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}