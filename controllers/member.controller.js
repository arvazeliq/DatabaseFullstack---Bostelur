const model = require(`../models/member.model`)
const page = `member`

exports.tampilanDataKeseluruhan = async (request, response) => {
    try {
        let dataTabel = await model.dataKeseluruhan()
        let sendData = {
            page: `${page}`,
            data: dataTabel,
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
exports.tampilanTambah = async (request, response) => {
    try {
        let sendData = {
            page: `form-${page}`,
            nama_member: ``,
            alamat: ``,
            telepon:``,
            targetRoute: `/list-${page}/add`,
            user: request.session.user,
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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
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
            nama_member: dataDipilih[0].nama_member,
            alamat: dataDipilih[0].alamat,
            telepon: dataDipilih[0].telepon,
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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
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