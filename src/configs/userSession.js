export const  getUserSession = () => {
    var session = {}
    if (typeof window !== 'undefined') {
        session = JSON.parse(window.sessionStorage.getItem('session'))
    }
    return session
}

export const setUserSession = (session) => {
    window.sessionStorage.setItem('session', session)
}