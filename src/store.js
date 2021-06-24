import create from "zustand";
import { persist } from "zustand/middleware";
import { get, set } from "idb-keyval";

export const IDBStorage = {
  getItem: async (name) => {
    // Exit early on server
    if (typeof indexedDB === "undefined") {
      return null;
    }

    const value = await get(name);

    console.log("load indexeddb called");
    return value || null;
  },
  setItem: async (name, value) => {
    // Exit early on server
    if (typeof indexedDB === "undefined") {
      return;
    }
    set(name, value);
  },
};

export default create(
  persist(
    (set, get) => ({
      products: [],
      clear: () => {
        console.log("clear called !");
        set({
          products: [],
        });
      },
      loadProducts: async () => {
        console.log("load called 1");
        const response = await fetch(
          "https://hub.dummyapis.com/products?noofRecords=10&idStarts=1001&currency=usd"
        );
        const products = await response.json();
        const current_products = get().products;

        console.log("load called 2", products);

        set({
          products: [...current_products, ...products],
        });
      },
    }),
    {
      name: "app_products",
      getStorage: () => IDBStorage,
    }
  )
);
