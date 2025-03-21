const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// 连接 SQLite 数据库 (错误处理)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
  } else {
    console.log('已连接到 SQLite 数据库.');
  }
});

// 初始化数据库表 (错误处理)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建表失败:', err.message);
    }
  });
});

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 获取所有留言 (错误处理)
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error('查询留言失败:', err.message);
      return res.status(500).json({ error: '服务器内部错误' });
    }
    res.json(rows);
  });
});

// 提交新留言 (错误处理)
app.post('/api/messages', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: '姓名和留言内容不能为空.' });
  }

  const stmt = db.prepare('INSERT INTO messages (name, content) VALUES (?, ?)');
  stmt.run([name, content], function (err) {
    if (err) {
      console.error('添加留言失败:', err.message);
      return res.status(500).json({ error: '服务器内部错误' });
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});