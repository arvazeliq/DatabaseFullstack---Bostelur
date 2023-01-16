const crypto =  require(`crypto-js`)

exports.enkripsi = (plain) => {
    let key = `BosTelur`
    let result = crypto.AES.encrypt(plain, key).toString()
    return result
}
exports.deskripsi = (cypher) => {
    let key = `BosTelur`
    let byte = crypto.AES.decrypt(cypher, key)
    let result = byte.toString(crypto.enc.Utf8)
    return result
}