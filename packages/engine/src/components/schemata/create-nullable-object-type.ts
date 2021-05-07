import { createDataType } from "@javelin/ecs";

export const createNullableObjectType = <T = any>() => {
  return createDataType<T | null>({
    name: "nullableObject",
    create(value = null) {
      return value;
    },
    reset(c, key, value = null) {
      c[key] = value;
    },
  });
};
