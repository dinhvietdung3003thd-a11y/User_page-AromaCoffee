import { useMemo, useState } from 'react';
import { cartStorage, type CartStorageItem } from '../utils/cartStorage';

export interface CartStore {
  items: CartStorageItem[];
  isDrawerOpen: boolean;
  itemCount: number;
  addItem: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  hydrateFromStorage: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = (): CartStore => {
  const [items, setItems] = useState<CartStorageItem[]>(() => cartStorage.getCart());
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const addItem = (productId: string) => {
    setItems(cartStorage.addToCart(productId, 1));
  };

  const updateItem = (productId: string, quantity: number) => {
    setItems(cartStorage.updateItem(productId, quantity));
  };

  const removeItem = (productId: string) => {
    setItems(cartStorage.removeItem(productId));
  };

  const clearItems = () => {
    cartStorage.clearCart();
    setItems([]);
  };

  const hydrateFromStorage = () => {
    setItems(cartStorage.getCart());
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return {
    items,
    isDrawerOpen,
    itemCount,
    addItem,
    updateItem,
    removeItem,
    clearItems,
    hydrateFromStorage,
    openDrawer,
    closeDrawer
  };
};
