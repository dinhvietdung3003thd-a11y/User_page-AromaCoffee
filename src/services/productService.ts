import type { ProductCategory } from '../types/product.types';

const homeCategories: ProductCategory[] = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Freeze', value: 'freeze' },
  { label: 'Cake', value: 'cake' },
  { label: 'Smoothie', value: 'smoothie' },
  { label: 'Snack', value: 'snack' }
];

export const productService = {
  getHomeCategories(): ProductCategory[] {
    return homeCategories;
  }
};
