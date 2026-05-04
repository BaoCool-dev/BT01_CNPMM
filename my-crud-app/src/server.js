import app from './app';
require('dotenv').config();

const PORT = process.env.PORT || 8088;

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
