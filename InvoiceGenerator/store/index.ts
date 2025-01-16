/* eslint-disable prettier/prettier */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Storage from 'expo-sqlite/kv-store';
import { Invoice, BusinessEntity, InvoiceInfo, InvoiceItem } from '~/schema/invoice';

export type InvoiceState = {
  profile: BusinessEntity;
  onboardingCompleted: boolean;
  newInvoice: Partial<Invoice> | null;
  setProfile: (profile: BusinessEntity) => void;
  setOnboardingCompleted: (profile: BusinessEntity) => void;
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
      profile: {
        name: "",
        address: "",
        taxID: "",
      },
      onboardingCompleted: false,
      // PROFILE
      setProfile: (profile) => set(() => ({ profile })),
      setOnboardingCompleted: () => set(() => ({onboardingCompleted: true})),
      newInvoice: null,
      startNewInvoice: () =>
        set(() => ({
          newInvoice: {
            sender: get().profile,
          },
        })),
      resetNewInvoices: () => set(() => ({ newInvoice: null })),
      addRecipientInfo: (recipient) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, recipient } })),
      addInvoiceInfo: (invoiceInfo) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
      addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
      getSubtotal: () => {
        const items = get().newInvoice?.items || [];
        return items.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseFloat(item.quantity);
          return (
            acc + (isNaN(price) || isNaN(quantity) ? 0 : parseFloat((price * quantity).toFixed(2)))
          );
        }, 0);
      },
      getTotal: () => get().getSubtotal(),
    }),
    {
      name: 'invoice-store',
      getStorage: () => Storage,
    }
  )
);
