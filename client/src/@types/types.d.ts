type GetArrayItemType<T extends any[]> = T extends (infer R)[] ? R : never;

type TPizza = {
  id: string;
  name: string;
  type: number[];
  size: number[];
  price: number;
  imageUrl: string;
};
