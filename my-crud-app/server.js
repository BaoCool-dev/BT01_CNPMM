require('dotenv').config();
import app from './src/app';

const PORT = process.env.PORT || 8088;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║   Server đang chạy trên cổng ${PORT}  ║
║   http://localhost:${PORT}             ║
╚════════════════════════════════════╝
  `);
});