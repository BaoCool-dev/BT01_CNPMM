import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import db from './models/index';
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'crud-app-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

configViewEngine(app);

db.sequelize.authenticate()
  .then(() => console.log('Kết nối database thành công.'))
  .catch(err => console.error('Không thể kết nối database:', err));

initWebRoutes(app);

app.use((req, res) => {
  res.status(404).render('404.ejs', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500.ejs', { message: err.message });
});

module.exports = app;
