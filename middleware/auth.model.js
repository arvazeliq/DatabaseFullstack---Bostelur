exports.cekUser = (request, response, next) => {
    if (request.session.user !== undefined) {
        next()
    } else {
        return response.redirect(`/verification`)
    }
}