"use client"
import { useState, useEffect, useRef } from "react";
import getCallAPI from "@/app/api/getCallAPI";
import { Product, Category, Material } from "@/app/interfaces/interfaces";
import FilterForProducts from "@/app/components/FilterForProducts";
import ProductComponent from "@/app/components/ProductComponent";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const API_FOR_ALL_PRODUCTS = 'https://c1bb0d8a5f1d.airneis.net/api/products';
  const API_FOR_CATEGORIES = "https://c1bb0d8a5f1d.airneis.net/api/categories";
  const API_FOR_MATERIALS = "https://c1bb0d8a5f1d.airneis.net/api/materials";
  const filterDivRef = useRef<HTMLDivElement>(null);


  const fetchDataProducts = async () => {
    const response = await getCallAPI(API_FOR_ALL_PRODUCTS);
    setProducts(response.products);
  };

  const fetchCategories = async () => {
    const response = await getCallAPI(API_FOR_CATEGORIES);
    setCategories(response.categories);
  };

  const fetchMaterials = async () => {
    const response = await getCallAPI(API_FOR_MATERIALS);
    setMaterials(response.materials);
  };

  const fetchFilteredProducts = async () => {
    const categoryQuery = selectedCategories.map(id => `categories=${id}`).join('&');
    const materialQuery = selectedMaterials.map(id => `materials=${id}`).join('&');
    const query = [categoryQuery, materialQuery].filter(Boolean).join('&');
    const response = await getCallAPI(`${API_FOR_ALL_PRODUCTS}?${query}`);
    setProducts(response.products);
  };


  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };


  useEffect(() => {
    fetchDataProducts();
    fetchCategories();
    fetchMaterials();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategories, selectedMaterials]);

  return (
    <>
      <main className="sm:flex content-below-navbar">
        <div className="sm:hidden flex justify-center w-full">
          <button className="pb-5 btn btn-ghost text-xl" onClick={toggleFilterVisibility}>
            <i className="fa-solid fa-filter sm:hidden flex "></i>
          </button>
        </div>
        <div
          ref={filterDivRef}
          className={`w-96 ${isFilterVisible ? 'block' : 'hidden'} sm:block`}
        >
          <FilterForProducts
            categories={categories}
            materials={materials}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
          />
        </div>
        <div className="sm:flex flex flex-col  sm:flex-row flex-wrap items-center">
          {products ? (
            products.map((product, i) => (
              <ProductComponent product={product} i={i} key={i} />
            ))
          ) : (
            <section className="content-below-navbar flex-1 min-h-screen">
              <div className="flex flex-col gap-4 w-52 ">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default ProductsPage;
