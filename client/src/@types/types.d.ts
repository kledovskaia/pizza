type GetArrayItemType<T extends any[]> = T extends (infer R)[] ? R : never;

type TPizza = {
  id: string;
  price: number;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

type TCartPizza = {
  id: TPizza['id'];
  name: TPizza['name'];
  imageUrl: TPizza['imageUrl'];
  size: GetArrayItemType<TPizza['sizes']>;
  type: GetArrayItemType<TPizza['types']>;
  count: number;
  price: number;
  subTotal: number;
};
