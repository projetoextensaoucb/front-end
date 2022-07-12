export const  getUserSession = () => {
    var session
    if (typeof window !== 'undefined') {
        session = window.sessionStorage.getItem('session')
    }
    return session
}

export const setUserSession = (session) => {
    window.sessionStorage.setItem('session', JSON.stringify(session))
}