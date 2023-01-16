const express = require(`express`)
const app = express()

const controller = require(`../controllers/egg.controller`)
const verification = require(`../middleware/auth.model`)

app.use(express.urlencoded({ extended: true }))

app.get(`/`, verification.cekUser, controller.tampilanDataKeseluruhan)
app.get(`/add`, verification.cekUser, controller.tampilanTambah)
app.post(`/add`, verification.cekUser, controller.prosesTambah)
app.get(`/edit/:id`, verification.cekUser, controller.tampilanUbah)
app.post(`/edit/:id`, verification.cekUser, controller.prosesUbah)
app.get(`/delete/:id`, verification.cekUser, controller.prosesHapus)

module.exports = app