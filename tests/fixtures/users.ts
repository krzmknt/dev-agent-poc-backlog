import { TestUser } from './types';

/**
 * Default test users
 */
export const testUsers: Record<string, TestUser> = {
  customer: {
    id: 'user-1',
    email: 'customer@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
  },
  admin: {
    id: 'user-2',
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
};

/**
 * Generate a random user for testing
 */
export function generateTestUser(overrides: Partial<TestUser> = {}): TestUser {
  const randomId = Math.random().toString(36).substring(7);
  return {
    id: `user-${randomId}`,
    email: `test-${randomId}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: `User${randomId}`,
    role: 'customer',
    ...overrides,
  };
}
