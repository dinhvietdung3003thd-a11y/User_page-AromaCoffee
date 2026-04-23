const CART_KEY = 'aroma_cart_items';

export interface CartStorageItem {
  productId: string;
  quantity: number;
}

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const normalizeItem = (item: Partial<CartStorageItem>): CartStorageItem | null => {
  if (!item.productId || typeof item.productId !== 'string') {
    return null;
  }

  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  return {
    productId: item.productId,
    quantity: Math.floor(quantity)
  };
};

const writeCart = (items: CartStorageItem[]): CartStorageItem[] => {
  if (isBrowser()) {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  return items;
};

export const cartStorage = {
  getCart(): CartStorageItem[] {
    if (!isBrowser()) {
      return [];
    }

    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as Partial<CartStorageItem>[];
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map(normalizeItem).filter((item): item is CartStorageItem => item !== null);
    } catch {
      return [];
    }
  },

  addToCart(productId: string, quantity = 1): CartStorageItem[] {
    const existing = this.getCart();
    const normalizedQty = Math.max(1, Math.floor(quantity));
    const index = existing.findIndex((item) => item.productId === productId);

    if (index === -1) {
      return writeCart([...existing, { productId, quantity: normalizedQty }]);
    }

    const next = [...existing];
    next[index] = {
      ...next[index],
      quantity: next[index].quantity + normalizedQty
    };

    return writeCart(next);
  },

  updateItem(productId: string, quantity: number): CartStorageItem[] {
    const existing = this.getCart();
    const normalizedQty = Math.floor(quantity);

    if (normalizedQty <= 0) {
      return writeCart(existing.filter((item) => item.productId !== productId));
    }

    const index = existing.findIndex((item) => item.productId === productId);
    if (index === -1) {
      return writeCart([...existing, { productId, quantity: normalizedQty }]);
    }

    const next = [...existing];
    next[index] = {
      ...next[index],
      quantity: normalizedQty
    };

    return writeCart(next);
  },

  removeItem(productId: string): CartStorageItem[] {
    const existing = this.getCart();
    return writeCart(existing.filter((item) => item.productId !== productId));
  },

  clearCart(): void {
    writeCart([]);
  }
};
