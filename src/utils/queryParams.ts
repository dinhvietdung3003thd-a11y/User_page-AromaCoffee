export const getCategoryQueryPath = (category: string): string =>
  `/our-product?category=${encodeURIComponent(category)}`;
