const connection = require(`../config`)
const tabel = 'member'

exports.dataKeseluruhan = () => {
    return new Promise((resolve, rejected) => {
        let query = `select * from ${tabel}`
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error)
            }resolve(result)
        })
    })
}
exports.dataDenganParameter = (parameter) => {
    return new Promise((resolve, rejected) => {
        let selector = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(` and `)
        let query = `select * from ${tabel} where ${selector}`
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error)
            }
            resolve(result)
        })
    })
}
exports.tambah = (dataObject) =>{
    return new Promise((resolve, rejected) => {
        let kolom = Object.keys(dataObject).join()
        let values = Object.values(dataObject)
            .map(value => `"${value}"`)
            .join()
        let query = `insert into ${tabel} (${kolom}) values (${values})`
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}
exports.ubah = (dataObject, parameter) => {
    return new Promise((resolve, rejected) => {
        let dataDiubah = Object
            .keys(dataObject)
            .map(key => `${key}="${dataObject[key]}"`)
            .join()
        let selector = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(` and `)
        let query = `update ${tabel} set ${dataDiubah} where ${selector}`
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}
exports.hapus = (parameter) => {
    return new Promise((resolve, rejected) => {
        let selector = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(` and `)

        let query = `delete from ${tabel} where ${selector}`
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}