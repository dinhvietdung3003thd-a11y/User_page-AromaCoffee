export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  description: string;
  price: number;
  currency: 'USD' | 'VND';
  imageUrl: string;
  isAvailable: boolean;
}

export interface ProductCatalog {
  categories: ProductCategory[];
  products: ProductItem[];
}
