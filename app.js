const express = require('express');
const session = require('express-session');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESSION_LIFETIME = TWO_HOURS,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'Sonaldo',
} = process.env

const IN_PRODUCTION = NODE_ENV === 'production'

const users = [
  { id: 1,
    name: 'Alex',
    email: 'alex@gmail.com',
    password: 'secret'
  },
  { id: 2,
    name: 'Carli',
    email: 'carli@gmail.com',
    password: 'secret'
  },
  { id: 3,
    name: 'Mia',
    email: 'mia@gmail.com',
    password: 'secret'
  },
];

const app = express();

app.use(session({
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true, // 'strict'
    secure: IN_PRODUCTION
  }
}))


app.get('/', (req, res) => {
  const userId = null;
  
  
  res.send(`
    <h1>Welcome!</h1>
    ${userId ? 
      `
      <a href='/home'>Home</a>
      <form method='post' action='/logout'>
        <button>Logout</button>
      </form>
      ` : 
      `
      <a href='/login'>Login</a>
      <a href='/register'>Register</a>
      `}
  `)
})

app.get('/home', (req, res) => {
  res.send(`
    <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
      <li>Name: </li>
      <li>Email: </li>
    </ul>
  `)
})

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='email' required />
      <input type='password' name='password' placeholder='password' required />
      <input type='submit' />
    </form>
    <a href='/register'>Register</a>
  `)
})

app.get('/register', (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form method='post' action='/register'>
      <input type='name' placeholder='name' required />
      <input type='email' name='email' placeholder='email' required />
      <input type='password' name='password' placeholder='password' required />
      <input type='submit' />
    </form>
    <a href='/login'>Login</a>
`)
})

app.get('/logout', (req, res) => {
  
})

app.listen(PORT, () => console.log(
  `http://localhost:${PORT}`
));