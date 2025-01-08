/* eslint-disable prettier/prettier */
import { create } from 'zustand';
import { Invoice, BusinessEntity, InvoiceInfo, InvoiceItem } from '~/schema/invoice';

export type InvoiceState = {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (sender: BusinessEntity) => void;
  addRecipientInfo: (recipient: BusinessEntity) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfo) => void;
  addItems: (items: InvoiceItem[]) => void;
  getSubtotal: () => any;
  getTotal: () => any;
};

export const useStore = create<InvoiceState>((set, get) => ({
  newInvoice: {},
  addSenderInfo: (sender) => set((state) => ({ newInvoice: { ...state.newInvoice, sender } })),
  addRecipientInfo: (recipient) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipient } })),

  addInvoiceInfo: (invoiceInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
  addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
  getSubtotal: () => {
    const items = get().newInvoice.items || [];
    return items?.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity);
      return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0);
  },
  getTotal: () => {
    const subtotal = get().getSubtotal();
    return subtotal;
  },
}));
