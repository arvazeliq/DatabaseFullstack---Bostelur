const express = require(`express`)
const app = express()

const controller = require(`../controllers/transaksi.controller`)
const verification = require(`../middleware/auth.model`)

app.use(express.urlencoded({ extended: true }))

app.post(`/`, verification.cekUser, controller.tambahDaftar)
app.get(`/:id`, verification.cekUser, controller.hapusDaftar)

module.exports = app