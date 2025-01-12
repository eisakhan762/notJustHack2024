/* eslint-disable prettier/prettier */
import { create } from 'zustand';
import {persist} from 'zustand/middleware'
import Storage from 'expo-sqlite/kv-store'
import { Invoice, BusinessEntity, InvoiceInfo, InvoiceItem } from '~/schema/invoice';

export type InvoiceState = {
  newInvoice: Partial<Invoice> | null;
  addSenderInfo: (sender: BusinessEntity) => void;
  startNewInvoice: () => void;
  resetNewInvoices: () => void;
  addRecipientInfo: (recipient: BusinessEntity) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfo) => void;
  addItems: (items: InvoiceItem[]) => void;
  getSubtotal: () => any;
  getTotal: () => any;
};

export const useStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      newInvoice: null,
      startNewInvoice: () => set(() => ({ newInvoice: {} })),
      resetNewInvoices: () => set(() => ({ newInvoice: null })),
      addSenderInfo: (sender) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, sender } })),
      addRecipientInfo: (recipient) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, recipient } })),
      addInvoiceInfo: (invoiceInfo) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
      addItems: (items) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
      getSubtotal: () => {
        const items = get().newInvoice?.items || [];
        return items.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseFloat(item.quantity);
          return acc + (isNaN(price) || isNaN(quantity) ? 0 : parseFloat((price * quantity).toFixed(2)));
        }, 0);
      },
      getTotal: () => get().getSubtotal(),
    }),
    {
      name: "invoice-store",
      getStorage: () => Storage
    }
  )
);
