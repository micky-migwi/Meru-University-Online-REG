import { promises as fs } from 'fs';
import path from 'path';
import { Application, Profile } from '@/lib/types';
import { demoApplications, demoProfiles } from '@/lib/mock-data';

const dataDir = path.join(process.cwd(), '.data');
const dbPath = path.join(dataDir, 'smartreg.json');

type Store = {
  profiles: Profile[];
  applications: Application[];
};

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    const initial: Store = { profiles: demoProfiles, applications: demoApplications };
    await fs.writeFile(dbPath, JSON.stringify(initial, null, 2));
  }
}

export async function readStore(): Promise<Store> {
  await ensureStore();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw) as Store;
}

export async function writeStore(store: Store) {
  await ensureStore();
  await fs.writeFile(dbPath, JSON.stringify(store, null, 2));
}
