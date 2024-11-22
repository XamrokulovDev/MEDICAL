const sqlite3 = require("sqlite3").verbose();

// Ma'lumotlar bazasini yaratish (user.db)
const db = new sqlite3.Database("./user.db", (err) => {
    if (err) {
        console.error("Xatolik:", err.message);
    } else {
        console.log("Ma'lumotlar bazasiga ulanish muvaffaqiyatli.");
    }
});

// Jadvalni yaratish (agar mavjud bo'lmasa)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        medical_history TEXT NOT NULL,
        contact_info TEXT NOT NULL,
        created_at TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Jadval yaratishda xatolik:", err.message);
        } else {
            console.log("Jadval muvaffaqiyatli yaratildi yoki mavjud.");
        }
    });
});

module.exports = db;