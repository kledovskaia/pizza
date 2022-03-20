type GetArrayItemType<T extends any[]> = T extends (infer R)[] ? R : never;

type TPizza = {
  id: string;
  price: number;
  name: string;
  imageUrl: string;
  types: TPizza['type'][];
  sizes: TPizza['size'][];
};

type TCartPizza = {
  id: TPizza['id'];
  name: TPizza['name'];
  imageUrl: TPizza['imageUrl'];
  size: TPizza['size'];
  type: TPizza['type'];
  count: number;
  price: number;
  subTotal: number;
};
