const express = require(`express`)
const app = express()

const controller = require(`../controllers/auth.controller`)

app.use(express.urlencoded({ extended: true }))

app.get(`/`, controller.tampilanVerifikasi)
app.post(`/`, controller.verifikasi)
app.get(`/logout`, controller.keluar)

module.exports = app