const CART_KEY = 'aroma_cart_items';

interface CartItemLike {
  quantity?: number;
}

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

export const cartStorage = {
  getCartCount(fallback = 2): number {
    if (!isBrowser()) {
      return fallback;
    }

    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(raw) as CartItemLike[];
      if (!Array.isArray(parsed)) {
        return fallback;
      }

      const total = parsed.reduce((sum, item) => sum + (item.quantity && item.quantity > 0 ? item.quantity : 1), 0);
      return total;
    } catch {
      return fallback;
    }
  }
};
