import { createDataType } from "@javelin/ecs";

export const createObjectType = <T = any>() => {
  return createDataType<T>({
    name: "object",
    create(value = {} as T) {
      return value;
    },
    reset(c, key, value = {} as T) {
      c[key] = value;
    },
  });
};
