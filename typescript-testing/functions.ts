import { Group, User } from './types';

export function isEmailValid(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function isZipCodeValid(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode.replace(' ', ''));
}

export function makeHeading(text: string, level: number): string {
  if (level < 1 || level > 6) {
    throw new Error('heading level out of range, allowed values are 1-6');
  }

  return `<h${level}>${text}</h${level}>`;
}

export function formatPrice(price: number, format: string): string {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  if (!format.includes('%PRICE%')) {
    throw new Error('Format string must include %PRICE%');
  }
  const roundedPrice = price.toFixed(2);
  return format.replace('%PRICE%', roundedPrice);
}

export function isLowerCase(text: string): boolean {
  return text === text.toLowerCase();
}

export function isPrimeNumber(number: number): boolean {
  if (number < 2) {
    return false;
  }
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return true;
}

export function getGenitive(name: string): string {
  if (name.endsWith('s') || name.endsWith('S')) {
    return `${name}`;
  }
  return `${name}s`;
}

export function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          'name': 'Erik',
          'group': 1,
        },
        {
          'name': 'Lisa',
          'group': 2,
        },
        {
          'name': 'Hampus',
          'group': 2,
        },
        {
          'name': 'Linda',
          'group': 3,
        },
        {
          'name': 'Eva',
          'group': 1,
        },
        {
          'name': 'Anna',
          'group': 3,
        },
      ]);
    }, 1000);

  });
}

export function getGroups(): Promise<Group[]> {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          'id': 1,
          'groupName': 'Hajarna',
        },
        {
          'id': 2,
          'groupName': 'Valarna',
        },
        {
          'id': 3,
          'groupName': 'Zebrorna',
        },
      ]);
    }, 1000);
  });
}