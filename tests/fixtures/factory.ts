import { TestDataFactory, TestUser, TestProduct, TestOrder } from './types';
import { generateTestUser } from './users';
import { generateTestProduct } from './products';
import { generateTestOrder } from './orders';

/**
 * Test data factory implementation
 */
export class TestFactory implements TestDataFactory {
  private createdUsers: TestUser[] = [];
  private createdProducts: TestProduct[] = [];
  private createdOrders: TestOrder[] = [];

  /**
   * Create a test user
   */
  createUser(overrides?: Partial<TestUser>): TestUser {
    const user = generateTestUser(overrides);
    this.createdUsers.push(user);
    return user;
  }

  /**
   * Create a test product
   */
  createProduct(overrides?: Partial<TestProduct>): TestProduct {
    const product = generateTestProduct(overrides);
    this.createdProducts.push(product);
    return product;
  }

  /**
   * Create a test order
   */
  createOrder(overrides?: Partial<TestOrder>): TestOrder {
    const order = generateTestOrder(overrides);
    this.createdOrders.push(order);
    return order;
  }

  /**
   * Cleanup all created test data
   */
  async cleanup(): Promise<void> {
    // In a real implementation, this would make API calls to delete test data
    // For now, we just clear the arrays
    this.createdUsers = [];
    this.createdProducts = [];
    this.createdOrders = [];
  }

  /**
   * Get all created users
   */
  getCreatedUsers(): TestUser[] {
    return [...this.createdUsers];
  }

  /**
   * Get all created products
   */
  getCreatedProducts(): TestProduct[] {
    return [...this.createdProducts];
  }

  /**
   * Get all created orders
   */
  getCreatedOrders(): TestOrder[] {
    return [...this.createdOrders];
  }
}

/**
 * Global test factory instance
 */
export const testFactory = new TestFactory();
