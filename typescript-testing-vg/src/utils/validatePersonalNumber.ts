export default function(personalnumber: string): boolean {
  // Remove hyphen that is followed by four digits at the end
  personalnumber = personalnumber.replace(/-(\d{4})$/, '$1');

  // If the length is 12, remove the first two characters
  // example: 2022 at the start becomes 22
  if (personalnumber.length === 12) {
    personalnumber = personalnumber.substring(2);
  }

  if (personalnumber.length !== 10) {
    return false;
  }

  const month = parseInt(personalnumber.substring(2, 4));
  const day = parseInt(personalnumber.substring(4, 6));
  const lastFour = parseInt(personalnumber.substring(6, 10));

  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }
  if (lastFour < 0 || lastFour > 9999) {
    return false;
  }
  return true;
}
