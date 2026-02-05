import { TestOrder } from './types';

/**
 * Default test orders
 */
export const testOrders: TestOrder[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      { productId: 'product-1', quantity: 2 },
      { productId: 'product-2', quantity: 1 },
    ],
    total: 109.97,
    status: 'pending',
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [{ productId: 'product-3', quantity: 1 }],
    total: 99.99,
    status: 'confirmed',
  },
];

/**
 * Generate a random order for testing
 */
export function generateTestOrder(overrides: Partial<TestOrder> = {}): TestOrder {
  const randomId = Math.random().toString(36).substring(7);
  const items = overrides.items || [
    {
      productId: `product-${Math.floor(Math.random() * 3) + 1}`,
      quantity: Math.floor(Math.random() * 3) + 1,
    },
  ];

  const total = overrides.total || Math.floor(Math.random() * 500) + 50;

  return {
    id: `order-${randomId}`,
    userId: overrides.userId || 'user-1',
    items,
    total,
    status: 'pending',
    ...overrides,
  };
}
