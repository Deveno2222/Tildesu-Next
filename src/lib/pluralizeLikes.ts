export default function pluralizeLikes(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return "лайк";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100))
    return "лайка";
  return "лайков";
}
