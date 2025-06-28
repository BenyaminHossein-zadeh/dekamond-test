const setItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item !== null) return JSON.parse(item);
  return false;
};

const getItemGeneric = (key: string): string | false => {
  const value = localStorage.getItem(key);
  if (value !== null) return value;
  return false;
};

const setItemGeneric = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const removeItem = (key: string): void | false => {
  if (getItem(key) === false) return false;
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage, setItemGeneric, getItemGeneric };
