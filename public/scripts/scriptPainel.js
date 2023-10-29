document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const streamerForm = document.querySelector('#streamerForm');
    streamerForm.addEventListener('submit', async event => {
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const twitchURL = document.querySelector('#twitchURL').value;
        const instagramURL = document.querySelector('#instagramURL').value;
        const twitterURL = document.querySelector('#twitterURL').value;

        try {
            const responseAddLive = await axios.post("http://localhost:3000/lives/joaovictorvx.api.add.lives", {
                nameLive: name,
                twitchURL,
                instagramURL,
                twitterURL
            })

            const data = responseAddLive.data
            Swal.fire(data.message, '', 'success')
            createLinks()
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message })
        }
    });

    const createLinks = () => {
        const streamerList = document.querySelector('#streamerList');
        streamerList.innerHTML = '';

        axios.get('http://localhost:3000/lives/joaovictorvx.api.lives').then(streamers => {
            streamers.data.loadStreamer.forEach(streamer => {
                const listItem = document.createElement('li');
                const h3_Text_Streamer = document.createElement('h3');
                h3_Text_Streamer.textContent = streamer.name;

                const campoBotoes = document.createElement('div');
                campoBotoes.classList.add('campo_botoes');

                const editButton = document.createElement('button');
                editButton.innerHTML = 'Editar <i class="bi bi-pencil"></i>';
                editButton.classList.add('edit-buttom');

                const removeButton = document.createElement('button');
                removeButton.innerHTML = 'Remover <i class="bi bi-trash3-fill"></i>';
                removeButton.classList.add('remove-button');

                removeButton.addEventListener('click', async () => {
                    const nameDelete = h3_Text_Streamer.textContent;

                    const caixaDelete = await Swal.fire({
                        title: 'Confirmação de exclusão',
                        text: 'Tem certeza de que deseja continuar?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Sim, excluir'
                    })

                    if (caixaDelete.isConfirmed) {
                        const responseDeletarLive = await axios.delete(`http://localhost:3000/lives/joaovictorvx.api.delete.lives?name=${nameDelete}`)

                        Swal.fire('Deletado!', responseDeletarLive.data.message, 'success')
                        createLinks()
                    }
                });

                campoBotoes.appendChild(editButton);
                campoBotoes.appendChild(removeButton);

                listItem.appendChild(h3_Text_Streamer);
                listItem.appendChild(campoBotoes);

                streamerList.appendChild(listItem);
            });
            eventoClickEdit(createLinks)
        });
    };

    socket.on('updateStreamers', (evt) => {
        createLinks()
    });

    createLinks();
});


const eventoClickEdit = (createLinks) => {
    const edit_buttons = document.querySelectorAll("button.edit-buttom");

    edit_buttons.forEach(el => {
        el.addEventListener("click", async evt => {
            evt.preventDefault();

            const liveEditar = el.parentElement.previousElementSibling.textContent;

            const { value: formValues } = await Swal.fire({
                title: `Editando o link: ${liveEditar}`,
                html:
                    `<input id="swal-input1" type="text" placeholder="Novo nome(opcional)" value="${liveEditar}" class="swal2-input">` +
                    '<input id="swal-input2" type="text" placeholder="Novo link Twitch" class="swal2-input">' +
                    '<input id="swal-input3" type="text" placeholder="Novo link Instagram" class="swal2-input">' +
                    '<input id="swal-input4" type="text" placeholder="Novo link Twitter" class="swal2-input">',
                focusConfirm: false,
            })

            if (formValues) {
                const swal_input1 = document.querySelector("#swal-input1").value
                const swal_input2 = document.querySelector("#swal-input2").value
                const swal_input3 = document.querySelector("#swal-input3").value
                const swal_input4 = document.querySelector("#swal-input4").value

                try {
                    const responseEditRequest = await axios.patch(`http://localhost:3000/lives/joaovictorvx.api.edit.lives?liveEditar=${liveEditar}&novoNome=${swal_input1}&novaUrlTwitch=${swal_input2}&novaUrlInstagram=${swal_input3}&novaUrlTwitter=${swal_input4}`)

                    const data = responseEditRequest.data

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 6000,
                        timerProgressBar: true
                    })
                    Toast.fire({
                        icon: 'success',
                        title: data.message
                    })

                    createLinks()
                } catch (error) {
                    Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message })
                }
            }
        });
    });
}