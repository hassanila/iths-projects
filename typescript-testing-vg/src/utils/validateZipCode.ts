export default function(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode.replace(' ', ''));
}
