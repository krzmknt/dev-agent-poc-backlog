/**
 * Test user fixture
 */
export interface TestUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
}

/**
 * Test product fixture
 */
export interface TestProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
}

/**
 * Test order fixture
 */
export interface TestOrder {
  id: string;
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

/**
 * Test data factory interface
 */
export interface TestDataFactory {
  createUser(overrides?: Partial<TestUser>): TestUser;
  createProduct(overrides?: Partial<TestProduct>): TestProduct;
  createOrder(overrides?: Partial<TestOrder>): TestOrder;
  cleanup(): Promise<void>;
}
