'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

type ChartVariant = 'bar' | 'line' | 'pie';

interface BaseChartProps {
  title?: string;
  description?: string;
  data: any[];
  variant: ChartVariant;
  height?: number;
}

interface AxisChartProps extends BaseChartProps {
  variant: 'bar' | 'line';
  xAxisKey: string;
  yAxisKey: string;
  dataKey: string;
  additionalDataKeys?: string[];
  colors?: string[];
}

interface PieChartProps extends BaseChartProps {
  variant: 'pie';
  nameKey: string;
  dataKey: string;
  colors?: string[];
}

type PerformanceChartProps = AxisChartProps | PieChartProps;

export function PerformanceChart(props: PerformanceChartProps) {
  const { title, description, data, variant, height = 300 } = props;
  
  const defaultColors = ['#0F3460', '#FFD700', '#4A1D75', '#2E8B57', '#FFA000', '#D32F2F'];
  
  const renderChart = () => {
    switch (variant) {
      case 'bar':
        const barProps = props as AxisChartProps;
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={barProps.xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey={barProps.dataKey} 
                fill={barProps.colors?.[0] || defaultColors[0]} 
                radius={[4, 4, 0, 0]}
              />
              {barProps.additionalDataKeys?.map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={barProps.colors?.[index + 1] || defaultColors[(index + 1) % defaultColors.length]} 
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        const lineProps = props as AxisChartProps;
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={lineProps.xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={lineProps.dataKey} 
                stroke={lineProps.colors?.[0] || defaultColors[0]} 
                activeDot={{ r: 8 }} 
              />
              {lineProps.additionalDataKeys?.map((key, index) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={lineProps.colors?.[index + 1] || defaultColors[(index + 1) % defaultColors.length]} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        const pieProps = props as PieChartProps;
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={pieProps.dataKey}
                nameKey={pieProps.nameKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={pieProps.colors?.[index] || defaultColors[index % defaultColors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Invalid chart variant</div>;
    }
  };

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
}
