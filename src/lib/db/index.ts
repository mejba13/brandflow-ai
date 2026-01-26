import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Singleton instance
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

export function getDatabase() {
  if (_db) {
    return _db;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn("DATABASE_URL not set - database features disabled");
    return null;
  }

  try {
    // Create postgres client
    _client = postgres(connectionString, {
      prepare: false, // Disable prepared statements for Supabase connection pooling
    });

    _db = drizzle(_client, { schema });
    return _db;
  } catch (error) {
    console.warn("Failed to connect to database:", error);
    return null;
  }
}

// For convenience, export a lazy db instance
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    const database = getDatabase();
    const value = database[prop as keyof typeof database];
    if (typeof value === "function") {
      return value.bind(database);
    }
    return value;
  },
});

// Export type
export type Database = typeof db;

// Export all schema for easy access
export * from "./schema";
