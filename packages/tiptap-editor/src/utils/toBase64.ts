export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const TexttoBase64 = (str: string) => {
  const utf8Bytes = new TextEncoder().encode(str); // 编码为 UTF-8 Uint8Array
  const binaryString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join('');
  return btoa(binaryString);
}
