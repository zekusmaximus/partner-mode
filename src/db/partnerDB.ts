import Dexie, { Table } from 'dexie';

export interface MemoryEntry { id?: number; date: string; prompt: string; response: string; }
export interface Intention { id?: number; description: string; created: string; completed?: string; }
export interface Reflection { id?: number; date: string; content: string; mood?: string; }
export interface GoodPartnerMoment { id?: number; timestamp: string; label: string; }
export interface ConnectionMoment { id?: number; timestamp: string; description: string; }

class PartnerDB extends Dexie {
  memory!: Table<MemoryEntry>;
  intentions!: Table<Intention>;
  reflections!: Table<Reflection>;
  partnerMoments!: Table<GoodPartnerMoment>;
  connections!: Table<ConnectionMoment>;

  constructor() {
    super('PartnerModeDB');
    this.version(1).stores({
      memory: '++id, date',
      intentions: '++id, created, completed',
      reflections: '++id, date, mood',
      partnerMoments: '++id, timestamp, label',
      connections: '++id, timestamp',
    });
  }
}

export const db = new PartnerDB();
