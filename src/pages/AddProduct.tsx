import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react';
import { mockCategories } from '../data/mockData';
import { formatCurrency } from '../utils/format';
export function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sku: '',
    name: '',
    categoryId: '',
    description: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    imageUrl: '',
    status: 'active' as 'active' | 'inactive'
  });
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    alert(`บันทึกสินค้า "${form.name}" สำเร็จ`);
    navigate('/products');
  };
  const profitMargin =
  form.price && form.cost && Number(form.price) > 0 ?
  (Number(form.price) - Number(form.cost)) / Number(form.price) * 100 :
  0;
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              เพิ่มสินค้าใหม่
            </h1>
            <p className="text-slate-500">กรอกข้อมูลสินค้าให้ครบถ้วน</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/products"
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
            
            ยกเลิก
          </Link>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center transition-colors shadow-sm">
            
            <Save size={18} className="mr-2" />
            บันทึกสินค้า
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              ข้อมูลทั่วไป
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    รหัสสินค้า (SKU) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    placeholder="เช่น DRK-001"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                  
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    ชื่อสินค้า <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="ชื่อสินค้าเต็ม"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                  
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  หมวดหมู่ <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) => handleChange('categoryId', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  
                  <option value="">-- เลือกหมวดหมู่ --</option>
                  {mockCategories.map((cat) =>
                  <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  คำอธิบายสินค้า
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="รายละเอียดสินค้าเพิ่มเติม (ถ้ามี)"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              ราคา
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ราคาทุน (บาท) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.cost}
                  onChange={(e) => handleChange('cost', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ราคาขาย (บาท) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>
            </div>
            {form.cost && form.price &&
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    กำไรต่อชิ้น
                  </p>
                  <p className="text-lg font-bold text-indigo-700">
                    {formatCurrency(Number(form.price) - Number(form.cost))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    Margin
                  </p>
                  <p className="text-lg font-bold text-indigo-700">
                    {profitMargin.toFixed(2)}%
                  </p>
                </div>
              </div>
            }
          </div>

          {/* Stock */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              สต็อกเริ่มต้น
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  จำนวนสต็อกเริ่มต้น
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  จุดสั่งซื้อใหม่ (Min Stock)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.minStock}
                  onChange={(e) => handleChange('minStock', e.target.value)}
                  placeholder="ระบบจะแจ้งเตือนเมื่อสต็อกถึงจำนวนนี้"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image + Status */}
        <div className="space-y-6">
          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              รูปสินค้า
            </h2>
            <div className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center relative">
              {form.imageUrl ?
              <>
                  <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }} />
                
                  <button
                  type="button"
                  onClick={() => handleChange('imageUrl', '')}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm text-rose-500">
                  
                    <X size={16} />
                  </button>
                </> :

              <div className="text-center text-slate-400 p-4">
                  <ImagePlus size={40} className="mx-auto mb-2" />
                  <p className="text-sm">ใส่ URL รูปด้านล่าง</p>
                </div>
              }
            </div>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="https://..."
              className="mt-3 w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
            
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              สถานะการขาย
            </h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                <input
                  type="radio"
                  name="status"
                  checked={form.status === 'active'}
                  onChange={() => handleChange('status', 'active')}
                  className="mt-0.5 accent-indigo-600" />
                
                <div>
                  <p className="text-sm font-medium text-slate-800">เปิดขาย</p>
                  <p className="text-xs text-slate-500">
                    แสดงในหน้า POS และพร้อมขาย
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                <input
                  type="radio"
                  name="status"
                  checked={form.status === 'inactive'}
                  onChange={() => handleChange('status', 'inactive')}
                  className="mt-0.5 accent-indigo-600" />
                
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    ปิดการขาย
                  </p>
                  <p className="text-xs text-slate-500">ซ่อนจาก POS ชั่วคราว</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>);

}