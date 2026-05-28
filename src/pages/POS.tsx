import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';
export function POS() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { addToCart, totalQty, total } = useCart();
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
      activeCategory === 'all' || p.categoryId === activeCategory;
      return matchesSearch && matchesCategory && p.status === 'active';
    });
  }, [searchQuery, activeCategory]);
  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      {/* Topbar POS */}
      <div className="bg-white p-3 sm:p-4 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 pl-14 lg:pl-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20} />

          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" />

        </div>
        <div className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-lg hidden md:block whitespace-nowrap">
          พนักงาน: Admin User
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-3 sm:px-4 py-3 border-b border-slate-200 shrink-0 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>

            ทั้งหมด
          </button>
          {mockCategories.map((cat) =>
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>

              {cat.name}
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredProducts.map((product) =>
          <div
            key={product.id}
            onClick={() => addToCart(product)}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col">

              <div className="h-28 sm:h-32 bg-slate-100 relative overflow-hidden">
                <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                {product.stock <= product.minStock &&
              <div className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    เหลือ {product.stock}
                  </div>
              }
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{product.sku}</p>
                  <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-2 text-indigo-600 font-bold">
                  {formatCurrency(product.price)}
                </div>
              </div>
            </div>
          )}
          {filteredProducts.length === 0 &&
          <div className="col-span-full text-center py-16 text-slate-400">
              ไม่พบสินค้าที่ค้นหา
            </div>
          }
        </div>
      </div>

      {/* Sticky Cart Bar */}
      {totalQty > 0 &&
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent pointer-events-none">
          <Link
          to="/cart"
          className="pointer-events-auto flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg px-5 py-3.5 font-bold transition-colors max-w-2xl mx-auto">

            <span className="flex items-center">
              <span className="relative mr-3">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-indigo-600 rounded-full text-[11px] flex items-center justify-center">
                  {totalQty}
                </span>
              </span>
              ไปที่ตะกร้า ({totalQty} ชิ้น)
            </span>
            <span>{formatCurrency(total)}</span>
          </Link>
        </div>
      }
    </div>);

}