export function getFileExtension (fileName: string): string {
  return fileName.split('.').pop();
}
