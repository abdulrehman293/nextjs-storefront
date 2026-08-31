import { pool } from '@/lib/db'; 

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
  return res.rows;
}

export default async function Storefront() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-gray-900">Featured Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            
            {/* Fixed Aspect Ratio Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
              />
            </div>
            
            {/* Flex-grow ensures buttons align at the bottom */}
            <div className="flex flex-col flex-grow p-6">
              <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">{product.description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}