const db = require("./src/database/database");

const columns = db.prepare(`
PRAGMA table_info(server_settings)
`).all();

console.table(columns);