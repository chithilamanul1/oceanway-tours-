export function splitFirstWord(text: string): { firstWord: string; rest: string } {
  const index = text.indexOf(' ');
  if (index === -1) return { firstWord: text, rest: '' };
  return { firstWord: text.slice(0, index), rest: text.slice(index + 1) };
}

export function formatPrice(price: number): string {
  return `USD ${price.toLocaleString()}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // If it already looks like a formatted date (contains letters + year), return as-is
  // This handles dates like "September 18, 2026" from the WordPress scraper
  if (/[a-zA-Z]/.test(dateString) && /\d{4}/.test(dateString)) {
    return dateString;
  }

  // Otherwise parse as ISO date (YYYY-MM-DD)
  const d = new Date(`${dateString}T12:00:00`);
  if (isNaN(d.getTime())) return dateString; // fallback: return as-is if still invalid

  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(d);
}
