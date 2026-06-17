// Small display helpers shared across views.

const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function parts(date) {
  // date is "YYYY-MM-DD"; parse as local calendar date without TZ drift.
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return { y, m, d, dow: DOW[dt.getDay()], mon: MON[m - 1] };
}

// 2026-06-17 -> "2026.06.17"
export function timecode(date) {
  return date.replace(/-/g, ".");
}

// 2026-06-17 -> "MON · JUN 17"
export function shortLabel(date) {
  const p = parts(date);
  return `${p.dow} · ${p.mon} ${p.d}`;
}

// 2026-06-17 -> "Wednesday, June 17, 2026"-ish long form (mono-friendly)
export function longLabel(date) {
  const FULL_DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const FULL_MON = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${FULL_DOW[dt.getDay()]}, ${FULL_MON[m - 1]} ${d}, ${y}`;
}
