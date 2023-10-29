const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', async evt => {
    evt.preventDefault()

    try {
        const user = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const responseLogin = await axios.post(`http://localhost:3000/auth/login`, {
            user,
            password
        })

        Swal.fire(responseLogin.data.message, '', 'success')
        setTimeout(() => window.location.href = responseLogin.data.url, 2500)
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message })
    }
});