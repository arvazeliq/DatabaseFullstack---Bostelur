const model = require(`../models/admin.model`)
const crypto = require(`../crypto`)
const lanjut = `list-egg`
const page = `verification`

exports.tampilanVerifikasi = (request, response) => {
    try {
        return response.render(`../views/pages/${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.verifikasi = async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password
        let result = await model.dataDenganParameter({ username: username })
        if (result.length = 1) {
            if (password === crypto.deskripsi(result[0].password)) {
                request.session.user = result[0]
                request.session.cart = []
                return response.redirect(`/${lanjut}`)
            } else {
                return response.redirect(`/${page}`)
            }
        } else {
            return response.redirect(`/${page}`)
        }
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.keluar = (request, response) => {
    try {
        request.session.user = undefined
        return response.redirect(`/${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}