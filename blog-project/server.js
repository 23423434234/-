import express from 'express';
import sqlite3 from 'sqlite3';
import { join } from 'path';

const app = express();
const PORT = 3000;

// 连接 SQLite 数据库
const db = new sqlite3.Database('./database.sqlite');

// 初始化数据库表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// 静态文件服务
app.use(express.static(join(process.cwd(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 获取所有留言
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 提交新留言
app.post('/api/messages', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: 'Name and content are required.' });
  }

  const stmt = db.prepare('INSERT INTO messages (name, content) VALUES (?, ?)');
  stmt.run([name, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});