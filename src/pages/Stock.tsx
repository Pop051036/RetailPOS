import React, { useState } from 'react';
import { ArrowDownToLine, ArrowRightLeft, History, Search } from 'lucide-react';
import { mockStockMovements, mockProducts } from '../data/mockData';
import { formatDate, formatNumber } from '../utils/format';
export function Stock() {
  const [activeTab, setActiveTab] = useState<'receive' | 'adjust' | 'history'>(
    'history'
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">จัดการสต็อก</h1>
        <p className="text-slate-500">
          รับสินค้าเข้า ปรับปรุงยอด และดูประวัติการเคลื่อนไหว
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          
          <History size={18} className="mr-2" /> ประวัติการเคลื่อนไหว
        </button>
        <button
          onClick={() => setActiveTab('receive')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'receive' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          
          <ArrowDownToLine size={18} className="mr-2" /> รับสินค้าเข้า
        </button>
        <button
          onClick={() => setActiveTab('adjust')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'adjust' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          
          <ArrowRightLeft size={18} className="mr-2" /> ปรับสต็อก
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'history' &&
        <div>
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">ประวัติล่าสุด</h2>
              <div className="relative w-64">
                <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18} />
              
                <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
              
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">วันที่/เวลา</th>
                    <th className="px-6 py-4">สินค้า</th>
                    <th className="px-6 py-4 text-center">ประเภท</th>
                    <th className="px-6 py-4 text-right">จำนวน</th>
                    <th className="px-6 py-4">หมายเหตุ/ผู้จำหน่าย</th>
                    <th className="px-6 py-4">ผู้ทำรายการ</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStockMovements.map((movement) =>
                <tr
                  key={movement.id}
                  className="border-b border-slate-100 hover:bg-slate-50">
                  
                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(movement.date)}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {movement.productName}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {movement.type === 'in' &&
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            รับเข้า
                          </span>
                    }
                        {movement.type === 'out' &&
                    <span className="bg-rose-100 text-rose-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            ขายออก
                          </span>
                    }
                        {movement.type === 'adjust' &&
                    <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            ปรับปรุง
                          </span>
                    }
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        <span
                      className={
                      movement.quantity > 0 ?
                      'text-emerald-600' :
                      'text-rose-600'
                      }>
                      
                          {movement.quantity > 0 ? '+' : ''}
                          {formatNumber(movement.quantity)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {movement.supplier || movement.note || '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {movement.user}
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        }

        {activeTab === 'receive' &&
        <div className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              ฟอร์มรับสินค้าเข้า
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  เลือกสินค้า
                </label>
                <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option value="">-- เลือกสินค้า --</option>
                  {mockProducts.map((p) =>
                <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name}
                    </option>
                )}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    จำนวนรับเข้า
                  </label>
                  <input
                  type="number"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="0" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ราคาทุนต่อหน่วย (บาท)
                  </label>
                  <input
                  type="number"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="0.00" />
                
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ผู้จำหน่าย (Supplier)
                </label>
                <input
                type="text"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="ชื่อบริษัท หรือ ตัวแทนจำหน่าย" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  หมายเหตุ
                </label>
                <textarea
                rows={3}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)">
              </textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                type="button"
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                
                  ยกเลิก
                </button>
                <button
                type="button"
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                
                  บันทึกรับเข้า
                </button>
              </div>
            </form>
          </div>
        }

        {activeTab === 'adjust' &&
        <div className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              ฟอร์มปรับปรุงสต็อก (ของเสีย/สูญหาย)
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  เลือกสินค้า
                </label>
                <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option value="">-- เลือกสินค้า --</option>
                  {mockProducts.map((p) =>
                <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name} (คงเหลือ: {p.stock})
                    </option>
                )}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ประเภทการปรับ
                  </label>
                  <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                    <option value="decrease">ลดสต็อก (-)</option>
                    <option value="increase">เพิ่มสต็อก (+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    จำนวนที่ปรับ
                  </label>
                  <input
                  type="number"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="0" />
                
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  สาเหตุ / หมายเหตุ <span className="text-rose-500">*</span>
                </label>
                <textarea
                rows={3}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="เช่น สินค้าชำรุด, หมดอายุ, นับสต็อกผิดพลาด">
              </textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                type="button"
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                
                  ยกเลิก
                </button>
                <button
                type="button"
                className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm">
                
                  บันทึกปรับปรุง
                </button>
              </div>
            </form>
          </div>
        }
      </div>
    </div>);

}