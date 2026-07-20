import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const LoadMore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 20;
  const MAX_PRODUCTS = 70;
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        // 194 cards
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      console.log(data);
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setTotalProducts(data.total);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };
const handleReset = ()=>{
  setProducts([]);
  setSkip(0)
}
  return (
    <div>
      {error && (
        <h2 className="text-center text-red-500 font-semibold">{error}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 pb-24">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="flex justify-center py-10 ">
        {products.length < MAX_PRODUCTS && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-16 py-5 text-xl font-bold min-w-[260px] bg-blue-600 text-white rounded-2xl 
    shadow-2xl shadow-blue-600/30
    transition-all duration-300 ease-in-out
    hover:bg-blue-700 hover:scale-110 hover:shadow-blue-500/50
    active:scale-95
    disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
        {products.length >= MAX_PRODUCTS && (
          <p onClick={handleReset} className="cursor-pointer px-16 py-5 text-xl font-bold text-blue-600 bg-blue-50 rounded-2xl border-2 border-blue-200 shadow-lg flex items-center gap-3">
             Handle Reset
          </p>
        )}
      </div>
    </div>
  );
};
export default LoadMore;
