import type { User, UserStatus } from "../../features/users/users.types";

const firstNames = [
  "Alex",
  "Sam",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Jamie",
  "Avery",
  "Quinn",
  "Hayden",
  "Parker",
  "Kai",
  "Drew",
  "Reese",
  "Rowan",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Garcia",
  "Martinez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
];

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(arr: T[]) => arr[randInt(0, arr.length - 1)];

const pad2 = (n: number) => String(n).padStart(2, "0");

const toISO = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mi = pad2(d.getMinutes());
  const ss = pad2(d.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}Z`;
};

const daysAgo = (n: number) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};

const hoursAgo = (n: number) => {
  const d = new Date();
  d.setUTCHours(d.getUTCHours() - n);
  return d;
};

const emailFromName = (first: string, last: string, i: number) => {
  const base = `${first}.${last}`.toLowerCase();
  const suffix = i % 7 === 0 ? `+ops${i}` : `${i}`;
  const domains = ["acme.io", "northwind.app", "contoso.dev", "mailbox.com"];
  return `${base}${suffix}@${pick(domains)}`;
};

const weightPickStatus = (): UserStatus => {
  const r = Math.random();
  if (r < 0.72) return "active";
  if (r < 0.9) return "pending";
  return "suspended";
};

const weightPickRole = (): User["role"] => {
  const r = Math.random();
  if (r < 0.84) return "user";
  if (r < 0.96) return "support";
  return "admin";
};

const makeUser = (i: number): User => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const name = `${first} ${last}`;
  const email = emailFromName(first, last, i);

  const created = daysAgo(randInt(1, 540));

  const status = weightPickStatus();
  const role = weightPickRole();

  const shouldHaveLastActive = Math.random() > 0.14;
  let lastActiveAt: string | null = null;

  if (shouldHaveLastActive) {
    const maxDays = Math.max(
      1,
      Math.floor((Date.now() - created.getTime()) / 86400000)
    );
    const recentBias =
      status === "active"
        ? randInt(0, Math.min(21, maxDays))
        : randInt(0, Math.min(120, maxDays));
    const activeDate =
      recentBias <= 2 ? hoursAgo(randInt(1, 48)) : daysAgo(recentBias);

    lastActiveAt =
      activeDate.getTime() < created.getTime()
        ? toISO(created)
        : toISO(activeDate);
  }

  return {
    id: `usr_${String(i).padStart(4, "0")}`,
    email,
    name,
    role,
    status,
    createdAt: toISO(created),
    lastActiveAt,
  };
};

export const users: User[] = Array.from({ length: 100 }, (_, idx) =>
  makeUser(idx + 1)
);
