import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'cricket_tournament.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
const createTables = () => {
  // Players table
  const createPlayersTable = `
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_code TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      player_type TEXT NOT NULL CHECK (player_type IN ('Batsman', 'Bowler', 'All-Rounder')),
      batting_hand TEXT NOT NULL CHECK (batting_hand IN ('Left', 'Right')),
      bowling_hand TEXT CHECK (bowling_hand IN ('Left', 'Right')),
      wicket_keeper BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Admin users table
  const createAdminTable = `
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.exec(createPlayersTable);
  db.exec(createAdminTable);

  // Insert default admin user
  const insertAdmin = db.prepare(`
    INSERT OR IGNORE INTO admin_users (username, password) 
    VALUES (?, ?)
  `);
  insertAdmin.run('admin', 'admin'); // In production, this should be hashed
};

// Initialize database
createTables();

export interface Player {
  id?: number;
  employee_code: string;
  full_name: string;
  email?: string;
  phone: string;
  player_type: 'Batsman' | 'Bowler' | 'All-Rounder';
  batting_hand: 'Left' | 'Right';
  bowling_hand?: 'Left' | 'Right';
  wicket_keeper: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id?: number;
  username: string;
  password: string;
  created_at?: string;
}

// Player operations
export const playerOperations = {
  // Insert new player
  insert: (player: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO players (employee_code, full_name, email, phone, player_type, batting_hand, bowling_hand, wicket_keeper)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      player.employee_code,
      player.full_name,
      player.email || null,
      player.phone,
      player.player_type,
      player.batting_hand,
      player.bowling_hand || null,
      player.wicket_keeper
    );
  },

  // Get all players
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM players ORDER BY created_at DESC');
    return stmt.all() as Player[];
  },

  // Get player by employee code
  getByEmployeeCode: (employeeCode: string) => {
    const stmt = db.prepare('SELECT * FROM players WHERE employee_code = ?');
    return stmt.get(employeeCode) as Player | undefined;
  },

  // Get statistics
  getStats: () => {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM players');
    const batsmanStmt = db.prepare("SELECT COUNT(*) as count FROM players WHERE player_type = 'Batsman'");
    const bowlerStmt = db.prepare("SELECT COUNT(*) as count FROM players WHERE player_type = 'Bowler'");
    const allRounderStmt = db.prepare("SELECT COUNT(*) as count FROM players WHERE player_type = 'All-Rounder'");
    const wicketKeeperStmt = db.prepare('SELECT COUNT(*) as count FROM players WHERE wicket_keeper = 1');

    return {
      total: (totalStmt.get() as any).total,
      batsmen: (batsmanStmt.get() as any).count,
      bowlers: (bowlerStmt.get() as any).count,
      allRounders: (allRounderStmt.get() as any).count,
      wicketKeepers: (wicketKeeperStmt.get() as any).count,
    };
  },

  // Search players
  search: (query: string) => {
    const stmt = db.prepare(`
      SELECT * FROM players 
      WHERE full_name LIKE ? OR employee_code LIKE ? OR phone LIKE ?
      ORDER BY created_at DESC
    `);
    const searchTerm = `%${query}%`;
    return stmt.all(searchTerm, searchTerm, searchTerm) as Player[];
  },
};

// Admin operations
export const adminOperations = {
  // Verify admin credentials
  verify: (username: string, password: string) => {
    const stmt = db.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?');
    return stmt.get(username, password) as AdminUser | undefined;
  },
};

export default db;
