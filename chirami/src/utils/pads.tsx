export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function pad3(n: number): string {
  return n.toString().padStart(3, "0");
}