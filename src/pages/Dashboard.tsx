import React from 'react';
import {
  TrendingUp,
  Receipt,
  AlertTriangle,
  Package,
  ArrowUpRight,
  ArrowDownRight } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { mockSales, mockProducts } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/format';
export function Dashboard() {
  // Calculate today's stats
  const today = new Date().toISOString().split('T')[0];
  const todaysSales = mockSales.filter((s) => s.date.startsWith(today));
  const todaysRevenue = todaysSales.reduce((sum, sale) => sum + sale.total, 0);
  const todaysBills = todaysSales.length;
  // Calculate low stock items
  const lowStockProducts = mockProducts.filter((p) => p.stock <= p.minStock);
  // Calculate total stock value
  const totalStockValue = mockProducts.reduce(
    (sum, p) => sum + p.cost * p.stock,
    0
  );
  // Prepare chart data (last 7 days)
  const chartData = Array.from({
    length: 7
  }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const daySales = mockSales.filter((s) => s.date.startsWith(dateStr));
    const revenue = daySales.reduce((sum, sale) => sum + sale.total, 0);
    return {
      name: d.toLocaleDateString('th-TH', {
        weekday: 'short'
      }),
      ยอดขาย: revenue
    };
  });
  // Top 5 products
  const productSales = new Map<
    string,
    {
      name: string;
      qty: number;
      revenue: number;
    }>(
  );
  mockSales.forEach((sale) => {
    sale.items.forEach((item) => {
      const existing = productSales.get(item.productId) || {
        name: item.productName,
        qty: 0,
        revenue: 0
      };
      productSales.set(item.productId, {
        name: item.productName,
        qty: existing.qty + item.quantity,
        revenue: existing.revenue + item.total
      });
    });
  });
  const topProducts = Array.from(productSales.values()).
  sort((a, b) => b.qty - a.qty).
  slice(0, 5);
  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    colorClass
  }: any) =>
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      {trend &&
    <div className="mt-4 flex items-center text-sm">
          {trend === 'up' ?
      <span className="text-emerald-500 flex items-center font-medium">
              <ArrowUpRight size={16} className="mr-1" /> {trendValue}
            </span> :

      <span className="text-rose-500 flex items-center font-medium">
              <ArrowDownRight size={16} className="mr-1" /> {trendValue}
            </span>
      }
          <span className="text-slate-400 ml-2">เทียบกับเมื่อวาน</span>
        </div>
    }
    </div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">ภาพรวมระบบ</h1>
        <p className="text-slate-500">ข้อมูลสรุปยอดขายและสต็อกสินค้าประจำวัน</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="ยอดขายวันนี้"
          value={formatCurrency(todaysRevenue || 12540)}
          icon={TrendingUp}
          trend="up"
          trendValue="+12.5%"
          colorClass="bg-indigo-50 text-indigo-600" />
        
        <StatCard
          title="จำนวนบิลวันนี้"
          value={formatNumber(todaysBills || 45)}
          icon={Receipt}
          trend="up"
          trendValue="+5.2%"
          colorClass="bg-emerald-50 text-emerald-600" />
        
        <StatCard
          title="สินค้าใกล้หมด"
          value={formatNumber(lowStockProducts.length)}
          icon={AlertTriangle}
          colorClass="bg-amber-50 text-amber-600" />
        
        <StatCard
          title="มูลค่าสต็อกรวม"
          value={formatCurrency(totalStockValue)}
          icon={Package}
          colorClass="bg-blue-50 text-blue-600" />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              ยอดขาย 7 วันย้อนหลัง
            </h2>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none">
              <option>7 วันล่าสุด</option>
              <option>เดือนนี้</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [
                  formatCurrency(value),
                  'ยอดขาย']
                  } />
                
                <Area
                  type="monotone"
                  dataKey="ยอดขาย"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            สินค้าขายดี (Top 5)
          </h2>
          <div className="space-y-5">
            {topProducts.map((product, index) =>
            <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-slate-100 text-slate-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
                  
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ขายแล้ว {formatNumber(product.qty)} ชิ้น
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {formatCurrency(product.revenue)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 &&
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <AlertTriangle className="text-amber-500 mr-2" size={20} />
              สินค้าใกล้หมดสต็อก
            </h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
              ดูทั้งหมด
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">รหัสสินค้า</th>
                  <th className="px-4 py-3">ชื่อสินค้า</th>
                  <th className="px-4 py-3 text-right">คงเหลือ</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">
                    จุดสั่งซื้อ
                  </th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.slice(0, 5).map((product) =>
              <tr
                key={product.id}
                className="border-b border-slate-100 last:border-0">
                
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3 text-right font-bold text-rose-500">
                      {formatNumber(product.stock)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatNumber(product.minStock)}
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>);

}