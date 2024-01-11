export default function(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}
