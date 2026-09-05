import { useEffect, useState } from "react";
import { FolderPlus, PackagePlus, Pencil, Trash2, Upload } from "lucide-react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  uploadProductImage,
} from "../../services/productService";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import ProductImage from "../../components/common/ProductImage";
import { formatCurrency, getSpecialPrice } from "../../utils/product";
import { toast } from "sonner";

const emptyProduct = {
  productName: "",
  description: "",
  quantity: 1,
  price: "",
  discount: 0,
};

const Admin = () => {
  const [tab, setTab] = useState("products");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const [cats, prods] = await Promise.all([
        getCategories({ pageSize: 50 }),
        getProducts({ pageSize: 50 }),
      ]);
      setCategories(cats?.content || []);
      setProducts(prods?.content || []);
      if (!selectedCategory && cats?.content?.[0]) setSelectedCategory(String(cats.content[0].categoryId));
    } catch (error) {
      toast.error("Unable to load admin data.");
    }
  };

  useEffect(() => { load(); }, []);

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.trim()) return;
    setLoading(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory, { categoryId: editingCategory, categoryName: categoryForm.trim() });
      } else {
        await createCategory({ categoryName: categoryForm.trim() });
      }
      setCategoryForm(""); setEditingCategory(null); await load(); toast.success("Category saved.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to save category.");
    } finally { setLoading(false); }
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return toast.error("Select a category.");
    setLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.productId, {
          ...productForm,
          productId: editingProduct.productId,
          quantity: Number(productForm.quantity),
          price: Number(productForm.price),
          discount: Number(productForm.discount),
        });
      } else {
        await createProduct(Number(selectedCategory), {
          ...productForm,
          quantity: Number(productForm.quantity),
          price: Number(productForm.price),
          discount: Number(productForm.discount),
        });
      }
      setProductForm(emptyProduct); setEditingProduct(null); await load(); toast.success("Product saved.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to save product.");
    } finally { setLoading(false); }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await deleteProduct(id); await load(); toast.success("Product deleted."); }
    catch (error) { toast.error(error?.response?.data?.message || "Unable to delete product."); }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try { await deleteCategory(id); await load(); toast.success("Category deleted."); }
    catch (error) { toast.error(error?.response?.data?.message || "Unable to delete category."); }
  };

  const editProduct = (p) => {
    setTab("products");
    setEditingProduct(p);
    setProductForm({
      productName: p.productName || "",
      description: p.description || "",
      quantity: p.quantity || 1,
      price: p.price || "",
      discount: p.discount || 0,
    });
  };

  return (
    <>
      <PageHeader eyebrow="Administration" title="Admin dashboard" description="Manage the catalog using the protected Spring Boot admin APIs." />
      <section className="container-page py-8">
        <div className="mb-7 flex gap-2 overflow-x-auto border-b border-gray-100">
          <button onClick={() => setTab("products")} className={`border-b-2 px-4 py-3 text-sm font-bold ${tab === "products" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500"}`}>Products</button>
          <button onClick={() => setTab("categories")} className={`border-b-2 px-4 py-3 text-sm font-bold ${tab === "categories" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500"}`}>Categories</button>
        </div>

        {tab === "products" && (
          <div className="grid gap-7 xl:grid-cols-[380px_1fr]">
            <form onSubmit={submitProduct} className="h-fit rounded-2xl border border-gray-100 p-5 sm:p-6 xl:sticky xl:top-28">
              <h2 className="flex items-center gap-2 text-lg font-bold"><PackagePlus size={19} className="text-purple-600" /> {editingProduct ? "Edit product" : "Add product"}</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm font-semibold">Category
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                  </select>
                </label>
                {[
                  ["productName", "Product name", "Wireless headphones"],
                  ["description", "Description", "Product description"],
                  ["quantity", "Stock quantity", "50"],
                  ["price", "Price", "2999"],
                  ["discount", "Discount %", "15"],
                ].map(([name, label, placeholder]) => (
                  <label key={name} className="block text-sm font-semibold">{label}
                    {name === "description" ? (
                      <textarea required value={productForm[name]} onChange={(e) => setProductForm({ ...productForm, [name]: e.target.value })} placeholder={placeholder} rows={4} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-300" />
                    ) : (
                      <input required min={name === "discount" ? 0 : name === "price" ? 0 : 1} type={name === "productName" ? "text" : "number"} value={productForm[name]} onChange={(e) => setProductForm({ ...productForm, [name]: e.target.value })} placeholder={placeholder} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-300" />
                    )}
                  </label>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button type="submit" loading={loading} className="flex-1">{editingProduct ? "Save changes" : "Create product"}</Button>
                {editingProduct && <Button type="button" variant="secondary" onClick={() => { setEditingProduct(null); setProductForm(emptyProduct); }}>Cancel</Button>}
              </div>
            </form>

            <div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article key={product.productId} className="overflow-hidden rounded-2xl border border-gray-100">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <ProductImage product={product} />
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-bold">{product.productName}</h3>
                      <p className="mt-1 text-xs text-gray-500">Stock: {product.quantity}</p>
                      <p className="mt-2 font-bold">{formatCurrency(getSpecialPrice(product))}</p>
                      <div className="mt-4 flex gap-2">
                        <button onClick={() => editProduct(product)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold"><Pencil size={14} /> Edit</button>
                        <button onClick={() => removeProduct(product.productId)} className="flex items-center justify-center rounded-lg border border-red-100 px-3 text-red-500"><Trash2 size={14} /></button>
                      </div>
                      <label className="mt-2 flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
                        <Upload size={14} /> Upload image
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try { await uploadProductImage(product.productId, file); await load(); toast.success("Image uploaded."); }
                          catch (error) { toast.error(error?.response?.data?.message || "Image upload failed."); }
                        }} />
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div className="grid gap-7 lg:grid-cols-[380px_1fr]">
            <form onSubmit={submitCategory} className="h-fit rounded-2xl border border-gray-100 p-5">
              <h2 className="flex items-center gap-2 font-bold"><FolderPlus size={19} className="text-purple-600" /> {editingCategory ? "Edit category" : "New category"}</h2>
              <input value={categoryForm} onChange={(e) => setCategoryForm(e.target.value)} required placeholder="Category name" className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-300" />
              <div className="mt-4 flex gap-2">
                <Button type="submit" loading={loading} className="flex-1">{editingCategory ? "Save" : "Create"}</Button>
                {editingCategory && <Button type="button" variant="secondary" onClick={() => { setEditingCategory(null); setCategoryForm(""); }}>Cancel</Button>}
              </div>
            </form>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category.categoryId} className="flex items-center justify-between rounded-2xl border border-gray-100 p-4">
                  <div><p className="text-sm font-bold">{category.categoryName}</p><p className="mt-1 text-xs text-gray-400">ID #{category.categoryId}</p></div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingCategory(category.categoryId); setCategoryForm(category.categoryName); }} className="rounded-lg p-2 text-gray-400 hover:text-purple-600"><Pencil size={16} /></button>
                    <button onClick={() => removeCategory(category.categoryId)} className="rounded-lg p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Admin;
