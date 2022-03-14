type GetArrayItemType<T extends any[]> = T extends (infer R)[] ? R : never;
