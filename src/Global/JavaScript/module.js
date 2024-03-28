export const account = {
    getUserData: () => {
        if (localStorage.getItem('userData') != undefined) {
            return JSON.parse(localStorage.getItem('userData'))
        }
        else {
            console.error('User data not found');
        }
    },
    setUserData: (data) => {
        localStorage.setItem('userData', JSON.stringify(data))
        console.log('User data saved successfully');
    }
}
export const link = (linkToPage) => {
    window.location.href = linkToPage
}