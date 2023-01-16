const model = require(`../models/pack.model`)
const page = `pack`

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
            nama_pack: ``,
            harga: ``,
            volume: ``,
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
            nama_pack: request.body.nama_pack,
            harga: request.body.harga,
            volume: request.body.volume
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
            nama_pack: dataDipilih[0].nama_pack,
            harga: dataDipilih[0].harga,
            volume: dataDipilih[0].volume,
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
            nama_pack: request.body.nama_pack,
            harga: request.body.harga,
            volume: request.body.volume
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