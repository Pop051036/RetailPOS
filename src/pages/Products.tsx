import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/format";
import { getCategories } from "../services/categoryApi";
import {
  getProducts,
  deleteProductApi,
  Product,
} from "../services/productApi";
import type { Category } from "../types";

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [productData, categoryData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(Array.isArray(productData) ? productData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error("Load products failed", error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const keyword = searchQuery.toLowerCase();

      const matchesSearch =
        p.name?.toLowerCase().includes(keyword) ||
        p.sku?.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "all" || Number(p.categoryId) === Number(categoryFilter);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const getCategoryName = (id: number) =>
    categories.find((c) => Number(c.id) === Number(id))?.name || "ไม่ระบุ";

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`ยืนยันการลบสินค้า "${product.name}"?`)) return;

    try {
      await deleteProductApi(Number(product.id));
      await loadData();
    } catch (error) {
      console.error("Delete product failed", error);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการสินค้า</h1>
          <p className="text-slate-500">เพิ่ม ลบ แก้ไข ข้อมูลสินค้าในระบบ</p>
        </div>

        <Link
          to="/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          เพิ่มสินค้าใหม่
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อ หรือ รหัสสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none min-w-[150px]"
            >
              <option value="all">ทุกหมวดหมู่</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">สินค้า</th>
                <th className="px-6 py-4">หมวดหมู่</th>
                <th className="px-6 py-4 text-right">ราคาทุน</th>
                <th className="px-6 py-4 text-right">ราคาขาย</th>
                <th className="px-6 py-4 text-right">สต็อก</th>
                <th className="px-6 py-4 text-center">สถานะ</th>
                <th className="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden mr-3 border border-slate-200 shrink-0">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                              IMG
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="font-medium text-slate-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {getCategoryName(product.categoryId)}
                    </td>

                    <td className="px-6 py-4 text-right text-slate-600">
                      {formatCurrency(product.cost)}
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {formatCurrency(product.price)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold ${
                          product.stock <= product.minStock
                            ? "text-rose-500"
                            : "text-slate-700"
                        }`}
                      >
                        {formatNumber(product.stock)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {product.status ? (
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          เปิดขาย
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          ปิดการขาย
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    ไม่พบข้อมูลสินค้า
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white text-sm">
          <span className="text-slate-500">
            แสดง 1 ถึง {filteredProducts.length} จาก {filteredProducts.length}{" "}
            รายการ
          </span>

          <div className="flex space-x-1">
            <button
              className="px-3 py-1 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              ก่อนหน้า
            </button>

            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md">
              1
            </button>

            <button
              className="px-3 py-1 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}