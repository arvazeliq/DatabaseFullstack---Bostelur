const model = require(`../models/admin.model`)
const crypto = require(`../crypto`)
const page = `admin`

exports.tampilanDataKeseluruhan = async (request, response) => {
    try {
        let dataTabel = await model.dataKeseluruhan()
        let kirimData = {
            page: `${page}`,
            data: dataTabel,
            user: request.session.user
        }
        return response.render(`../views/index`, kirimData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.tampilanTambah = async (request, response) => {
    try {
        let sendData = {
            page: `form-${page}`,
            nama_admin: ``,
            username: ``,
            password:``,
            targetRoute: `/list-${page}/add`,
            deskripsi: crypto.deskripsi,
            user: request.session.user
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.prosesTambah = async (request, response) => {
    try {
        let dataBaru = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypto.enkripsi(request.body.password),
        }
        await model.tambah(dataBaru)
        return response.redirect(`/list-${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.tampilanUbah = async (request, response) => {
    try {
        let idDipilih = request.params.id
        let parameter = {
            id: idDipilih
        }
        let dataDipilih = await model.dataDenganParameter(parameter)
        let sendData = {
            page: `form-${page}`,
            nama_admin: dataDipilih[0].nama_admin,
            username: dataDipilih[0].username,
            password: dataDipilih[0].password,
            deskripsi: crypto.deskripsi,
            targetRoute: `/list-${page}/edit/${idDipilih}`,
            user: request.session.user
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.prosesUbah = async (request, response) => {
    try {
        let idDipilih =  request.params.id
        let parameter = {
            id: idDipilih
        }
        let dataBaru = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypto.enkripsi(request.body.password),
        }
        await model.ubah(dataBaru, parameter)
        return response.redirect(`/list-${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.prosesHapus = async (request, response) => {
    try {
        let idDipilih =  request.params.id
        let parameter = {
            id: idDipilih
        }
        await model.hapus(parameter)
        return response.redirect(`/list-${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}