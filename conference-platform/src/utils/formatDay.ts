// Macht aus "2026-09-15" den Text "Di., 15.09."
export function formatDay(day: string) {
  return new Date(`${day}T00:00:00`).toLocaleDateString('de-AT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
}
