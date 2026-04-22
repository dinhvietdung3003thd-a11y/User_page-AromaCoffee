import type { ProductCatalog, ProductCategory, ProductItem } from '../types/product.types';

const categories: ProductCategory[] = [
  { id: 'coffee', name: 'Coffee', slug: 'coffee' },
  { id: 'tea', name: 'Tea', slug: 'tea' },
  { id: 'freeze', name: 'Freeze', slug: 'freeze' },
  { id: 'cake', name: 'Cake', slug: 'cake' }
];

const products: ProductItem[] = [
  {
    id: 'c1',
    categoryId: 'coffee',
    name: 'Caffe Latte',
    description: 'Espresso with silky steamed milk.',
    price: 4.5,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'c2',
    categoryId: 'coffee',
    name: 'Americano',
    description: 'Bold espresso balanced with hot water.',
    price: 3.9,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 't1',
    categoryId: 'tea',
    name: 'Matcha Latte',
    description: 'Green tea blend with fresh milk.',
    price: 4.2,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 't2',
    categoryId: 'tea',
    name: 'Peach Iced Tea',
    description: 'Refreshing black tea infused with peach.',
    price: 3.8,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'f1',
    categoryId: 'freeze',
    name: 'Mocha Freeze',
    description: 'Icy chocolate coffee topped with cream.',
    price: 5.2,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'k1',
    categoryId: 'cake',
    name: 'Cheesecake Slice',
    description: 'Creamy vanilla cheesecake with biscuit crust.',
    price: 4.7,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  }
];

const homeCategories = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Freeze', value: 'freeze' },
  { label: 'Cake', value: 'cake' },
  { label: 'Smoothie', value: 'smoothie' },
  { label: 'Snack', value: 'snack' }
];

const normalize = (value: string) => value.trim().toLowerCase();

export const productService = {
  getHomeCategories() {
    return homeCategories;
  },

  getProductCatalog(): ProductCatalog {
    return { categories, products };
  },

  getProductsByCategory(categoryId: string): ProductItem[] {
    return products.filter((product) => product.categoryId === categoryId);
  },

  searchProducts(term: string): ProductItem[] {
    const normalizedTerm = normalize(term);

    if (!normalizedTerm) {
      return [];
    }

    return products.filter((product) => {
      const searchable = `${product.name} ${product.description}`.toLowerCase();
      return searchable.includes(normalizedTerm);
    });
  }
};
