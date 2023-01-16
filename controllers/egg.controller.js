const model = require(`../models/egg.model`)
const page = `egg`

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
            jenis_telur: ``,
            stok: ``,
            harga: ``,
            targetRoute: `/list-${page}/add`,
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
            jenis_telur: request.body.jenis_telur,
            stok: request.body.stok,
            harga: request.body.harga,
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
            jenis_telur: dataDipilih[0].jenis_telur,
            stok: dataDipilih[0].stok,
            harga: dataDipilih[0].harga,
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
            jenis_telur: request.body.jenis_telur,
            stok: request.body.stok,
            harga: request.body.harga
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