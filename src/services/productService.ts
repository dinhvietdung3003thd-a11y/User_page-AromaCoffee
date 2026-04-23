import { appConfig } from '../config/appConfig';
import type { ProductCatalog, ProductCategory, ProductItem } from '../types/product.types';

interface ApiProduct {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: number;
  description: string | null;
  categoryName: string;
}

const resolveApiUrl = (path: string) => `${appConfig.apiBaseUrl}${path}`;

const mapApiProduct = (product: ApiProduct): ProductItem => ({
  id: String(product.productId),
  categoryId: String(product.categoryId),
  categoryName: product.categoryName,
  name: product.name,
  description: product.description ?? '',
  price: product.price,
  currency: 'VND',
  imageUrl: product.imageUrl,
  isAvailable: product.isAvailable
});

export const productService = {
  async fetchProducts(): Promise<ProductItem[]> {
    const response = await fetch(resolveApiUrl('/api/Product'));

    if (!response.ok) {
      throw new Error('Failed to load products.');
    }

    const data = (await response.json()) as ApiProduct[];
    return data.map(mapApiProduct);
  },

  async fetchProductById(id: string): Promise<ProductItem | null> {
    const response = await fetch(resolveApiUrl(`/api/Product/${id}`));

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to load product detail.');
    }

    const data = (await response.json()) as ApiProduct;
    return mapApiProduct(data);
  },

  async searchProductsElastic(keyword: string): Promise<ProductItem[]> {
    const response = await fetch(
      resolveApiUrl(`/api/Product/search-elastic?keyword=${encodeURIComponent(keyword)}`)
    );

    if (!response.ok) {
      throw new Error('Failed to search products.');
    }

    const data = (await response.json()) as ApiProduct[];
    return data.map(mapApiProduct);
  },

  buildCatalog(categories: ProductCategory[], products: ProductItem[]): ProductCatalog {
    return { categories, products };
  },

  getProductsByCategory(categoryId: string, products: ProductItem[]): ProductItem[] {
    return products.filter((product) => product.categoryId === categoryId);
  }
};
