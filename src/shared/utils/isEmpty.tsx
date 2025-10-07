/**
 * 배열/객체가 비어있는지 확인하는 유틸
 * @param value
 * @returns boolean
 */
export const isEmpty = (value: unknown): boolean => {
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === "object")
    return Object.keys(value).length === 0;
  return !value;
};
