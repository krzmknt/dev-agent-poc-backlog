/**
 * Product category
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * Product image
 */
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

/**
 * Product entity
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  category: Category;
  images: ProductImage[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product filter options
 */
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
  search?: string;
}

/**
 * Product sort options
 */
export type ProductSortBy =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'date-asc'
  | 'date-desc';

/**
 * Product list query params
 */
export interface ProductListParams extends ProductFilters {
  page?: number;
  pageSize?: number;
  sortBy?: ProductSortBy;
}
