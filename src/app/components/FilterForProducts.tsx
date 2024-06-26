'use client';
import { useRef } from 'react';
import { Category, Material } from '../interfaces/interfaces';
import { FilterForProductsProps } from '../interfaces/interfaces';
import { getCallApi } from '../api/get';

const FilterForProducts: React.FC<FilterForProductsProps> = ({
  categories,
  materials,
  selectedCategories,
  setSelectedCategories,
  selectedMaterials,
  setSelectedMaterials,
  setMinPrice,
  setMaxPrice,
}) => {
  

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleMaterialChange = (materialId: number) => {
    if (selectedMaterials.includes(materialId)) {
      setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId));
    } else {
      setSelectedMaterials([...selectedMaterials, materialId]);
    }
  };

  const refMinPrice = useRef<HTMLInputElement>(null);
  const refMaxPrice = useRef<HTMLInputElement>(null);

  const handlePriceChange = () => {
    const minPriceValue = refMinPrice.current?.value || '';
    const maxPriceValue = refMaxPrice.current?.value || '';
    setMinPrice(minPriceValue ? parseFloat(minPriceValue) : undefined);
    setMaxPrice(maxPriceValue ? parseFloat(maxPriceValue) : undefined);
   
  };

  const handleResetPrice = () => {
    refMinPrice.current!.value = '';
    refMaxPrice.current!.value = '';
  }

  const handleResetCategories = () => {
    setSelectedCategories([]);
  }

  const handleResetMaterials = () => {
    setSelectedMaterials([]);
  }

  return (
    <div className="space-y-4 pr-3 ml-3 ">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden ">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4  text-gray-900 transition">
          <span className="text-sm font-medium pr-9"> Catégories </span>

          <span className="transition group-open:-rotate-180 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={handleResetCategories}
            >
              Réinitialiser
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {categories.map((category: Category) => (
              <li key={category.id}>
                <label className="gap-2">
                  <div className="block">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      className="size-5 rounded border-gray-300 mr-2"
                      onChange={() => handleCategoryChange(category.id)}
                      checked={selectedCategories.includes(category.id)}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {' '}
                      {category.name}{' '}
                    </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Matériaux </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={handleResetMaterials}
            >
              Réinitialiser
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {materials.map((material: Material) => (
              <li key={material.id}>
                <label className="gap-2">
                  <div className="block">
                    <input
                      type="checkbox"
                      id={`material-${material.id}`}
                      className="size-5 rounded border-gray-300 mr-4"
                      onChange={() => handleMaterialChange(material.id)}
                      checked={selectedMaterials.includes(material.id)}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {material.name}
                    </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </details>
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Prix </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4 pl-5"
              onClick={handleResetPrice}
            >
              Réinitialiser
            </button>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">
              Le prix le plus chère est de 500€{' '}
            </span>

           
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">€</span>

                <input
                  type="number"
                  ref={refMinPrice}
                  placeholder="De"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  onChange={handlePriceChange}
                />
              </label>

              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">€</span>

                <input
                  type="number"
                  ref={refMaxPrice}
                  placeholder="à"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  onChange={handlePriceChange}
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default FilterForProducts;
