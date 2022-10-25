function add(a: number, b: number): number {
  return a + b;
}

interface Person {
  age: number,
  name: string,
  occupation?: string,
  location: string
}

console.log(add(2, 3)); // 5
