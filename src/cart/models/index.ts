export enum CartStatuses {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  productId: Product['id'];
  count: number;
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: CartStatuses;
  items: CartItem[];
};
