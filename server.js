const express = require(`express`)
const session = require(`express-session`)

const app = express()

const port = `1234`

app.set(`view engine`, `ejs`)
app.use(session({
    secret: `BosTelur`,
    resave: false,
    saveUninitialized: false
}))

const telur =  require(`./routes/egg.route`)
const admin =  require(`./routes/admin.route`)
const member =  require(`./routes/member.route`)
const pack =  require(`./routes/pack.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

app.use(`/list-egg`, telur)
app.use(`/list-admin`, admin)
app.use(`/list-member`, member)
app.use(`/list-pack`, pack)
app.use(`/verification`, auth)
app.use(`/transaction`, transaksi)
app.use(`/cart`, cart)

app.listen(port, () => {
    console.log(`Server BosTelur is running on port ${port}`)
})