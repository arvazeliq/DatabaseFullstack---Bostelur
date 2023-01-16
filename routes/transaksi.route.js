const express = require(`express`)
const app = express()

const controller = require(`../controllers/transaksi.controller`)
const verification = require(`../middleware/auth.model`)

app.use(express.urlencoded({ extended: true }))

app.get(`/add`, verification.cekUser, controller.tampilanFormTransaksi)
app.post(`/add`, verification.cekUser, controller.tambahTransaksi)
app.get(`/`, verification.cekUser, controller.tampilanTransaksi)
app.get(`/:id`, verification.cekUser, controller.hapusTransaksi)

module.exports = app