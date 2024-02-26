export const jsonStringifier = (type: string, outData: Record<string, unknown> | Record<string, unknown>[]) => {
  return JSON.stringify({
      type,
      data: JSON.stringify(outData),
      id: 0,
  });
}