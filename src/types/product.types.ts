export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  currency: 'USD';
  imageUrl: string;
  isAvailable: boolean;
}

export interface ProductCatalog {
  categories: ProductCategory[];
  products: ProductItem[];
}
