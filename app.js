const express = require('express')
const bodyParser = require ('body-parser')
const session = require('express-session')

var Filestore = require('session-file-store')(session);
var fileStoreOptions = {};


const TWO_HOURS = 1000 * 60 * 60 * 2


const {
    PORT = 3001,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'shh!quiet,it\'asecret!',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

const users = [
    { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret' },
    { id: 2, name: 'Max', email: 'max@gmail.com', password: 'secret' },
    { id: 3, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret' },

]

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/public',express.static('public'));

//React views - https://github.com/reactjs/express-react-views

('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.set('trust proxy', 1);

app.use(session({
    name: SESS_NAME,
    store: new Filestore(fileStoreOptions),
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
        } else {
            next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
        } else {
            next()
    }
}

app.get('/', (req, res) => {
    const { userId } = req.session

//     res.send(`
//     <h1>Welcome!</h1>
//     ${userId ? `
//     <a href='/home'>Home</a>
//     <form method='post' action='/logout'>
//         <button>Logout</button>
//     </form>
//     ` : `
//      <a href='/login'>Login</a>
//      <a href='/register'>Register</a>
//     `}
//   `)

res.render('index', {userId: userId, velkomsthilsen: "Velkommen til forsiden", sidetitel: "Forsiden"})
})

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === userId
            ) 
    }
    next()
})

app.get('/home', redirectLogin, (req, res) => {
    const {user} =  res.locals

    console.log(req.sessionID)
    // res.send(`
    //     <h1>Home</h1>
    //     <a href='/'>Main</a>
    //     <ul>
    //         <li>Name: ${user.name} </li>
    //         <li>Email: ${user.email} </li>
    //     </ul>
    // `)
    res.render('pages/home', {user: user, velkomsthilsen: "Velkommen til din profilside", sidetitel: "Home"})

})


app.get('/login', redirectHome, (req, res) => {
    // res.send(`
    // <h1>Login</h1>
    // <form method='post' action='/login'>
    //   <input type='email' name='email' placeholder='Email' required />
    //   <input type='password' name='password' placeholder='Password' required />
    //   <input type='submit' />
    // </form>
    // <a href='/register'>Register</a>
    // `)
    res.render('pages/login', {velkomsthilsen: "Velkommen til login siden", sidetitel: "Login"})

})

app.get('/register', redirectHome, (req, res) => {
    // res.send(`
    // <h1>Register</h1>
    // <form method='post' action='/register'>
    //   <input name='name' placeholder='Name' required/>
    //   <input type='email' name='email' placeholder='Email' required/>
    //   <input type='password' name='password' placeholder='Password' required/>
    //   <input type='submit' />
    // </form>
    // <a href='/login'>Login</a>
    // `)     
    res.render('pages/register', {velkomsthilsen: "Velkommen til registrersiden", sidetitel: "Register"})

})

app.post('/login', redirectHome, (req, res) => {
    const { email, password} = req.body

    if(email && password) {
        const user = users.find(user => user.email === email && user.password === password)
        
        if(user){
            req.session.userId = user.id
            return res.redirect('/home')
        }
    }
    res.redirect('/login')
})

app.post('/register', redirectHome, (req, res) => {
    const { name, email, password} = req.body

    if(name && email && password) {
       const exists = users.some(
           user => user.email === email
       )
       if(!exists){
           const user = {
               id: users.length + 1,
               name,
               email,
               password
           }

           users.push(user)

           req.session.userId = user.id

           return res.redirect('/home')
       }
    }

    res.redirect('/register')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/home')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`
))