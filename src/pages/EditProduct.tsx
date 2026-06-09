import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";
import { formatCurrency } from "../utils/format";
import { getCategories } from "../services/categoryApi";
import {
  getProductById,
  updateProductApi,
} from "../services/productApi";
import type { Category } from "../types";

export function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    sku: "",
    barcode: "",
    name: "",
    categoryId: "",
    description: "",
    price: "",
    cost: "",
    stock: "",
    minStock: "",
    imageUrl: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [categoryData, product] = await Promise.all([
          getCategories(),
          getProductById(Number(id)),
        ]);

        setCategories(Array.isArray(categoryData) ? categoryData : []);

        setForm({
          sku: product.sku ?? "",
          barcode: product.barcode ?? "",
          name: product.name ?? "",
          categoryId: String(product.categoryId ?? ""),
          description: product.description ?? "",
          price: String(product.price ?? ""),
          cost: String(product.cost ?? ""),
          stock: String(product.stock ?? ""),
          minStock: String(product.minStock ?? ""),
          imageUrl: product.imageUrl ?? "",
          status: product.status ? "active" : "inactive",
        });
      } catch (error) {
        console.error("Load product failed", error);
        alert("โหลดข้อมูลสินค้าไม่สำเร็จ");
        navigate("/products");
      }
    }

    loadData();
  }, [id, navigate]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!id || !form.sku.trim() || !form.name.trim() || !form.categoryId) return;

    try {
      setSaving(true);

      await updateProductApi(Number(id), {
        sku: form.sku.trim(),
        barcode: form.barcode.trim(),
        name: form.name.trim(),
        categoryId: Number(form.categoryId),
        description: form.description.trim(),
        cost: Number(form.cost || 0),
        price: Number(form.price || 0),
        stock: Number(form.stock || 0),
        minStock: Number(form.minStock || 0),
        imageUrl: form.imageUrl.trim(),
        status: form.status === "active",
      });

      navigate("/products");
    } catch (error) {
      console.error("Update product failed", error);
      alert("บันทึกสินค้าไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  const profitMargin =
    form.price && form.cost && Number(form.price) > 0
      ? ((Number(form.price) - Number(form.cost)) / Number(form.price)) * 100
      : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              แก้ไขสินค้า
            </h1>
            <p className="text-slate-500">แก้ไขข้อมูลสินค้าในระบบ</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link
            to="/products"
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            ยกเลิก
          </Link>

          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={
              saving ||
              !form.sku.trim() ||
              !form.name.trim() ||
              !form.categoryId
            }
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center transition-colors shadow-sm"
          >
            <Save size={18} className="mr-2" />
            {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              ข้อมูลทั่วไป
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    รหัสสินค้า (SKU) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={form.sku}
                    onChange={(e) => handleChange("sku", e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    ชื่อสินค้า <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  บาร์โค้ด
                </label>
                <input
                  value={form.barcode}
                  onChange={(e) => handleChange("barcode", e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  หมวดหมู่ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
                >
                  <option value="">-- เลือกหมวดหมู่ --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  คำอธิบายสินค้า
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              ราคา
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.cost}
                onChange={(e) => handleChange("cost", e.target.value)}
                placeholder="ราคาทุน"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="ราคาขาย"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>

            {form.cost && form.price && (
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
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              สต็อก
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                placeholder="จำนวนสต็อก"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
              />

              <input
                type="number"
                min="0"
                value={form.minStock}
                onChange={(e) => handleChange("minStock", e.target.value)}
                placeholder="Min Stock"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              รูปสินค้า
            </h2>

            <div className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center relative">
              {form.imageUrl ? (
                <>
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleChange("imageUrl", "")}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm text-rose-500"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ImagePlus size={40} className="mx-auto mb-2" />
                  <p className="text-sm">ใส่ URL รูปด้านล่าง</p>
                </div>
              )}
            </div>

            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="https://..."
              className="mt-3 w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              สถานะการขาย
            </h2>

            <label>
              <input
                type="radio"
                checked={form.status === "active"}
                onChange={() => handleChange("status", "active")}
              />
              เปิดขาย
            </label>

            <br />

            <label>
              <input
                type="radio"
                checked={form.status === "inactive"}
                onChange={() => handleChange("status", "inactive")}
              />
              ปิดการขาย
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}