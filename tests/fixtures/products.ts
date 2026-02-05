import { TestProduct } from './types';

/**
 * Default test products
 */
export const testProducts: TestProduct[] = [
  {
    id: 'product-1',
    name: 'Test Product 1',
    description: 'This is a test product for testing purposes',
    price: 29.99,
    sku: 'TEST-001',
    stock: 100,
    categoryId: 'category-1',
  },
  {
    id: 'product-2',
    name: 'Test Product 2',
    description: 'Another test product with different properties',
    price: 49.99,
    sku: 'TEST-002',
    stock: 50,
    categoryId: 'category-1',
  },
  {
    id: 'product-3',
    name: 'Test Product 3',
    description: 'Premium test product',
    price: 99.99,
    sku: 'TEST-003',
    stock: 25,
    categoryId: 'category-2',
  },
];

/**
 * Generate a random product for testing
 */
export function generateTestProduct(overrides: Partial<TestProduct> = {}): TestProduct {
  const randomId = Math.random().toString(36).substring(7);
  return {
    id: `product-${randomId}`,
    name: `Test Product ${randomId}`,
    description: `Description for test product ${randomId}`,
    price: Math.floor(Math.random() * 100) + 10,
    sku: `TEST-${randomId.toUpperCase()}`,
    stock: Math.floor(Math.random() * 200) + 10,
    categoryId: `category-${Math.floor(Math.random() * 3) + 1}`,
    ...overrides,
  };
}
