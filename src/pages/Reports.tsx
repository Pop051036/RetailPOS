import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend } from
'recharts';
import { mockSales, mockCategories } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/format';
export function Reports() {
  const [dateRange, setDateRange] = useState('7days');
  // Prepare Bar Chart Data (Daily Sales)
  const barData = Array.from({
    length: 7
  }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const daySales = mockSales.filter((s) => s.date.startsWith(dateStr));
    const revenue = daySales.reduce((sum, sale) => sum + sale.total, 0);
    return {
      name: d.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short'
      }),
      ยอดขาย: revenue
    };
  });
  // Prepare Pie Chart Data (Sales by Category)
  const categorySales = new Map<string, number>();
  mockSales.forEach((sale) => {
    sale.items.forEach((item) => {
      // Find category for item (mocking this lookup for simplicity, assuming we can find it)
      // In real app, item would have categoryId or we lookup from products
      const catName =
      mockCategories[Math.floor(Math.random() * mockCategories.length)].name;
      categorySales.set(catName, (categorySales.get(catName) || 0) + item.total);
    });
  });
  const pieData = Array.from(categorySales.entries()).map(([name, value]) => ({
    name,
    value
  }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">รายงานการขาย</h1>
          <p className="text-slate-500">วิเคราะห์ยอดขายและประสิทธิภาพของร้าน</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18} />
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none appearance-none font-medium text-slate-700 shadow-sm">
              
              <option value="today">วันนี้</option>
              <option value="7days">7 วันล่าสุด</option>
              <option value="30days">30 วันล่าสุด</option>
              <option value="thisMonth">เดือนนี้</option>
            </select>
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium flex items-center hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={18} className="mr-2" />
            ส่งออก
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            ยอดขายรายวัน
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />
                
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b',
                    fontSize: 12
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b',
                    fontSize: 12
                  }}
                  tickFormatter={(val) => `฿${val}`} />
                
                <Tooltip
                  cursor={{
                    fill: '#f1f5f9'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [
                  formatCurrency(value),
                  'ยอดขาย']
                  } />
                
                <Bar
                  dataKey="ยอดขาย"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            สัดส่วนยอดขายตามหมวดหมู่
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {pieData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                  formatCurrency(value),
                  'ยอดขาย']
                  }
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800">รายการบิลขายล่าสุด</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">เลขที่บิล</th>
                <th className="px-6 py-4">วันที่/เวลา</th>
                <th className="px-6 py-4">รายการสินค้า</th>
                <th className="px-6 py-4 text-center">วิธีชำระ</th>
                <th className="px-6 py-4 text-right">ยอดรวม</th>
              </tr>
            </thead>
            <tbody>
              {mockSales.slice(0, 10).map((sale) =>
              <tr
                key={sale.id}
                className="border-b border-slate-100 hover:bg-slate-50">
                
                  <td className="px-6 py-4 font-medium text-indigo-600 cursor-pointer hover:underline">
                    {sale.id}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatDate(sale.date)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {sale.items.length} รายการ
                    <span className="text-xs text-slate-400 block truncate w-48">
                      ({sale.items.map((i) => i.productName).join(', ')})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sale.paymentMethod === 'cash' &&
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        เงินสด
                      </span>
                  }
                    {sale.paymentMethod === 'transfer' &&
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        โอนเงิน
                      </span>
                  }
                    {sale.paymentMethod === 'card' &&
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        บัตรเครดิต
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    {formatCurrency(sale.total)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 text-center">
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
            ดูรายการทั้งหมด
          </button>
        </div>
      </div>
    </div>);

}