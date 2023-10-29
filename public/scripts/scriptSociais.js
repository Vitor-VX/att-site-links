const socket = io();
const sociaisDev = document.querySelectorAll('#sociaisDev a');

sociaisDev.forEach((el) => {
    el.addEventListener('click', (event) => {
        const link = event.currentTarget.href;
        socket.emit('clickLink', link);
    });
});