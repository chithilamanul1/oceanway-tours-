export function splitFirstWord(text: string): { firstWord: string; rest: string } {
  const index = text.indexOf(' ');
  if (index === -1) return { firstWord: text, rest: '' };
  return { firstWord: text.slice(0, index), rest: text.slice(index + 1) };
}

export function formatPrice(price: number): string {
  return `USD ${price.toLocaleString()}`;
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    new Date(`${dateString}T12:00:00`)
  );
}
