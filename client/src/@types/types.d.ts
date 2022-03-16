type GetArrayItemType<T extends any[]> = T extends (infer R)[] ? R : never;

type TPizza = {
  id: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};
