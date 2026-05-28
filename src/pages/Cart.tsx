import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  Banknote,
  CreditCard,
  Smartphone,
  CheckCircle2 } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';
export function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    totalQty,
    subtotal,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    resetCart
  } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'cash' | 'transfer' | 'card'>(
    'cash');
  const [cashReceived, setCashReceived] = useState<string>('');
  const change =
  paymentMethod === 'cash' && Number(cashReceived) >= total ?
  Number(cashReceived) - total :
  0;
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutModalOpen(true);
  };
  const handleConfirmPayment = () => {
    if (paymentMethod === 'cash' && Number(cashReceived) < total) {
      alert('รับเงินมาไม่พอดีกับยอดชำระ');
      return;
    }
    setIsCheckoutModalOpen(false);
    setIsReceiptModalOpen(true);
  };
  const handleNewSale = () => {
    resetCart();
    setCashReceived('');
    setPaymentMethod('cash');
    setIsReceiptModalOpen(false);
    navigate('/pos');
  };
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            to="/pos"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <ShoppingCart className="mr-2 text-indigo-600" size={24} />
              ตะกร้าสินค้า
            </h1>
            <p className="text-slate-500">
              {totalQty > 0 ?
              `${totalQty} ชิ้น พร้อมชำระเงิน` :
              'ยังไม่มีสินค้าในตะกร้า'}
            </p>
          </div>
        </div>
        {cart.length > 0 &&
        <button
          onClick={clearCart}
          className="text-sm text-rose-500 hover:text-rose-700 font-medium flex items-center px-3 py-2 hover:bg-rose-50 rounded-lg transition-colors">
          
            <Trash2 size={16} className="mr-1.5" /> ล้างตะกร้า
          </button>
        }
      </div>

      {cart.length === 0 ?
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <ShoppingCart size={64} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            ตะกร้าว่างเปล่า
          </h2>
          <p className="text-slate-500 mb-6">
            เลือกสินค้าจากหน้าขายเพื่อเริ่มต้น
          </p>
          <Link
          to="/pos"
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          
            ไปยังหน้าขาย
          </Link>
        </div> :

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800">
                รายการสินค้า ({cart.length} รายการ)
              </h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {cart.map((item) =>
            <li
              key={item.id}
              className="p-4 flex items-center gap-3 sm:gap-4">
              
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover" />
                
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5">{item.sku}</p>
                    <h3 className="text-sm sm:text-base font-medium text-slate-800 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 font-bold text-sm">
                      {formatCurrency(item.price)} / ชิ้น
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                  aria-label="ลบรายการ">
                  
                      <X size={18} />
                    </button>
                    <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200">
                      <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-200 rounded-l-lg transition-colors">
                    
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-200 rounded-r-lg transition-colors">
                    
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-800 hidden sm:block">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </li>
            )}
            </ul>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden lg:sticky lg:top-20">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-slate-800">สรุปคำสั่งซื้อ</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ยอดรวม ({totalQty} ชิ้น)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ส่วนลด</span>
                  <span>{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-800 pt-3 border-t border-slate-200">
                  <span>ยอดสุทธิ</span>
                  <span className="text-indigo-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-base transition-colors shadow-sm">
                
                  ดำเนินการชำระเงิน
                </button>
                <Link
                to="/pos"
                className="block text-center w-full mt-3 border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                
                  เลือกสินค้าเพิ่ม
                </Link>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Checkout Modal */}
      {isCheckoutModalOpen &&
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">รับชำระเงิน</h2>
              <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="text-slate-400 hover:text-slate-600">
              
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">ยอดที่ต้องชำระ</p>
                <div className="text-4xl font-bold text-indigo-600">
                  {formatCurrency(total)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm font-medium text-slate-700">
                  วิธีชำระเงิน
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  
                    <Banknote size={24} className="mb-1" />
                    <span className="text-sm font-medium">เงินสด</span>
                  </button>
                  <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${paymentMethod === 'transfer' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  
                    <Smartphone size={24} className="mb-1" />
                    <span className="text-sm font-medium">โอนเงิน</span>
                  </button>
                  <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  
                    <CreditCard size={24} className="mb-1" />
                    <span className="text-sm font-medium">บัตรเครดิต</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'cash' &&
            <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    รับเงินมา (บาท)
                  </label>
                  <input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="0.00"
                autoFocus />
              
                  {Number(cashReceived) >= total &&
              <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex justify-between items-center text-emerald-700">
                      <span className="text-sm font-medium">เงินทอน</span>
                      <span className="text-xl font-bold">
                        {formatCurrency(change)}
                      </span>
                    </div>
              }
                </div>
            }

              <button
              onClick={handleConfirmPayment}
              disabled={
              paymentMethod === 'cash' && (
              !cashReceived || Number(cashReceived) < total)
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg transition-colors shadow-sm">
              
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      }

      {/* Receipt Modal */}
      {isReceiptModalOpen &&
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 text-center border-b border-dashed border-slate-300 bg-slate-50 shrink-0">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                ชำระเงินสำเร็จ
              </h2>
              <p className="text-sm text-slate-500">
                ใบเสร็จรับเงิน #INV-{new Date().getTime().toString().slice(-6)}
              </p>
            </div>

            <div className="p-6 bg-white flex-1 overflow-y-auto">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-slate-800">RetailPOS</h3>
                <p className="text-xs text-slate-500">
                  วันที่ {new Date().toLocaleDateString('th-TH')} เวลา{' '}
                  {new Date().toLocaleTimeString('th-TH')}
                </p>
              </div>

              <div className="space-y-2 mb-4 border-t border-b border-dashed border-slate-200 py-4">
                {cart.map((item) =>
              <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-slate-800 font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
              )}
              </div>

              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ยอดรวม</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ภาษีมูลค่าเพิ่ม 7%</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 pt-2">
                  <span>ยอดสุทธิ</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {paymentMethod === 'cash' &&
            <div className="space-y-1 pt-2 border-t border-dashed border-slate-200">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>รับเงินสด</span>
                    <span>{formatCurrency(Number(cashReceived))}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>เงินทอน</span>
                    <span>{formatCurrency(change)}</span>
                  </div>
                </div>
            }
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex space-x-3 shrink-0">
              <button className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                พิมพ์ใบเสร็จ
              </button>
              <button
              onClick={handleNewSale}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              
                ขายรายการใหม่
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}