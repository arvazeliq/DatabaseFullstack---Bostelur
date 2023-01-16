const transaksiModel = require(`../models/transaksi.model`)
const detailModel = require(`../models/detail-transaksi.model`)
const eggModel = require(`../models/egg.model`)
const packModel = require(`../models/pack.model`)
const memberModel = require(`../models/member.model`)
const page = `transaction`

exports.tampilanFormTransaksi = async (request, response) => {
    try {
        let egg = await eggModel.dataKeseluruhan()
        let pack = await packModel.dataKeseluruhan()
        let member = await memberModel.dataKeseluruhan()
        let sendData = {
            dataEgg: egg,
            dataPack: pack,
            dataMember: member,
            page: `form-${page}`,
            tgl_transaksi: ``,
            dataEggString: JSON.stringify(egg),
            dataPackString: JSON.stringify(pack),
            user: request.session.user,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {

    }
}
exports.tambahDaftar = async (request, response) => {
    let eggDipilih = await eggModel.dataDenganParameter({
        id: request.body.id_telur
    })
    let packDipilih = await packModel.dataDenganParameter({
        id: request.body.id_pack
    })
    let simpanData = {
        id_telur: request.body.id_telur,
        jenis_telur: eggDipilih[0].jenis_telur,
        stok: eggDipilih[0].stok,
        jumlah_telur: request.body.jumlah_telur,
        harga_telur: request.body.harga_telur,
        id_pack: request.body.id_pack,
        nama_pack: packDipilih[0].nama_pack,
        jumlah_pack: request.body.jumlah_pack,
        harga_pack: request.body.harga_pack,
        volume : packDipilih[0].volume
    }
    request.session.cart.push(simpanData)
    return response.redirect(`/${page}/add`)
}
exports.hapusDaftar = async (request, response) => {
    try {
        let cart = request.session.cart
        let id = request.params.id

        let index = cart.findIndex(item => item.id == id)
        cart.splice(index, 1)
        request.session.cart = cart

        return response.redirect(`/${page}/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.tambahTransaksi = async (request, response) => {
    try {
        let transaksiBaru = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.user.id
        }
        let transaksi = await transaksiModel.tambah(transaksiBaru)
        let cart = request.session.cart
        for (let i = 0; i < cart.length; i++) {
            let id = {
                id: cart[i].id_telur
            }
            let stokBaru = cart[i].stok - cart[i].jumlah_telur
            let dataTelurBaru = {
                jenis_telur: cart[i].jenis_telur,
                harga: cart[i].harga_telur,
                stok: stokBaru
            }
            delete cart[i].jenis_telur
            delete cart[i].nama_pack
            delete cart[i].volume
            delete cart[i].stok
            cart[i].id_transaksi = transaksi.insertId
            await eggModel.ubah(dataTelurBaru, id)
            await detailModel.tambah(cart[i])
        }
        request.session.cart = []
        return response.redirect(`/${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.tampilanTransaksi = async (request, response) => {
    try {
        let transaksi = await transaksiModel.dataKeseluruhan()
        for (let i = 0; i < transaksi.length; i++) {
            let id = transaksi[i].id
            let detail = await detailModel.dataDenganParameter({ id_transaksi: id })
            transaksi[i].detail = detail
        }
        let sendData = {
            page: `${page}`,
            user: request.session.user,
            transaksi: transaksi
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
exports.hapusTransaksi = async (request, response) => {
    try {
        let id = request.params.id
        await detailModel.hapus({ id_transaksi: id })
        await transaksiModel.hapus({ id: id })
        return response.redirect(`/${page}`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}