export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFromLocalStorage = <T>(name: string): T | null => {
  const item = localStorage.getItem(name);

  if (item === null) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};
