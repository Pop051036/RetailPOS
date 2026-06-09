import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Tag, Package } from "lucide-react";
import { Category } from "../types";
import { formatNumber } from "../utils/format";
import {
  getCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../services/categoryApi";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load categories failed", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const getProductCount = (category: Category) => {
    return category.productCount ?? 0;
  };

  const totalProducts = categories.reduce(
    (sum, category) => sum + getProductCount(category),
    0
  );

  const averageProducts =
    categories.length > 0 ? Math.round(totalProducts / categories.length) : 0;

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName("");
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formName.trim()) return;

    try {
      if (editingCategory) {
        await updateCategoryApi(editingCategory.id, {
          name: formName.trim(),
          description: editingCategory.description ?? "",
          status: editingCategory.status ?? true,
        });
      } else {
        await createCategoryApi({
          name: formName.trim(),
          description: "",
          status: true,
        });
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      setFormName("");

      await loadCategories();
    } catch (error) {
      console.error("Save category failed", error);
      alert("บันทึกหมวดหมู่ไม่สำเร็จ");
    }
  };

  const handleDelete = async (category: Category) => {
    const productCount = getProductCount(category);

    if (productCount > 0) {
      alert(
        `ไม่สามารถลบหมวดหมู่ "${category.name}" ได้ เนื่องจากยังมีสินค้า ${productCount} รายการในหมวดนี้`
      );
      return;
    }

    if (!window.confirm(`ยืนยันการลบหมวดหมู่ "${category.name}"?`)) return;

    try {
      await deleteCategoryApi(category.id);
      await loadCategories();
    } catch (error) {
      console.error("Delete category failed", error);
      alert("ลบหมวดหมู่ไม่สำเร็จ");
    }
  };

  const categoryColors = [
    "bg-indigo-100 text-indigo-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-rose-100 text-rose-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">หมวดหมู่สินค้า</h1>
          <p className="text-slate-500">
            จัดการหมวดหมู่สำหรับจัดกลุ่มสินค้าในร้าน
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          เพิ่มหมวดหมู่ใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">หมวดหมู่ทั้งหมด</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatNumber(categories.length)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">สินค้ารวมทั้งหมด</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatNumber(totalProducts)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">เฉลี่ยต่อหมวดหมู่</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatNumber(averageProducts)}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          กำลังโหลดข้อมูล...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const count = getProductCount(category);
            const colorClass = categoryColors[index % categoryColors.length];

            return (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}
                  >
                    <Tag size={22} />
                  </div>

                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(category)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {category.name}
                </h3>

                <div className="flex items-center text-sm text-slate-500">
                  <Package size={14} className="mr-1.5" />
                  {formatNumber(count)} รายการ
                </div>
              </div>
            );
          })}

          <button
            onClick={openAddModal}
            className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-5 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all min-h-[140px]"
          >
            <Plus size={28} className="mb-2" />
            <span className="font-medium">เพิ่มหมวดหมู่ใหม่</span>
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                {editingCategory ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                ชื่อหมวดหมู่ <span className="text-rose-500">*</span>
              </label>

              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="เช่น เครื่องดื่ม, ขนมขบเคี้ยว"
                autoFocus
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors"
              >
                ยกเลิก
              </button>

              <button
                onClick={handleSave}
                disabled={!formName.trim()}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                {editingCategory ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}