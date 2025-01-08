/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const businessEntitySchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3, 'Min length required is 3'),
  address: z.string({ required_error: 'Address is required' }).min(10, 'Min length required is 10'),
  taxID: z.string().optional(),
});

export type BusinessEntity = z.infer<typeof businessEntitySchema>;

export const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice number is required' })
    .min(3, 'Min length required is 3'),
  date: z.string({ required_error: 'Date is required' }).min(1, 'Min length required is 1'),
  dueDate: z.string({ required_error: 'Due Date is required' }).min(1, 'Min length required is 1'),
});

export type InvoiceInfo = z.infer<typeof invoiceInfoSchema>;

export const invoiceItemSchema = z.object({
  name: z.string({ required_error: 'Name is required!' }).min(1, 'Name Mini length error'),
  quantity: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Quantity must be a positive number',
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Price must be a positive number',
  }),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

// export const itemsSchema = z.object({
//   items: invoiceItemSchema.array(),
// });

// export type Items = z.infer<typeof itemsSchema>;

export type Invoice = InvoiceInfo & {
  sender: BusinessEntity;
  recipient: BusinessEntity;
  items: InvoiceItem[];
};
