document.addEventListener('DOMContentLoaded', ()=> {
    const socket = io();

    const updateStreamers = () => {
        const streamerContainer = document.querySelector('main');
        streamerContainer.innerHTML = '';

        axios.get(`http://localhost:3000/lives/joaovictorvx.api.lives`).then(streamers => {
            streamers.data.loadStreamer.forEach(streamer => {
                const streamerElement = document.createElement('div');
                streamerElement.className = 'streamer';

                const streamerName = document.createElement('h2');
                streamerName.textContent = streamer.name;

                const streamerLinks = document.createElement('ul');

                const twitchLink = document.createElement('li');
                const twitchLinkA = document.createElement('a');
                twitchLinkA.href = streamer.twitchURL;
                twitchLinkA.target = '_blank';
                twitchLinkA.innerHTML = '<i class="fab fa-twitch"></i> Assistir';

                twitchLinkA.addEventListener('click', () => {
                    handleClick(streamer.twitchURL);
                });

                twitchLink.appendChild(twitchLinkA);

                const instagramLink = document.createElement('li');
                const instagramLinkA = document.createElement('a');
                instagramLinkA.href = streamer.instagramURL;
                instagramLinkA.target = '_blank';
                instagramLinkA.innerHTML = '<i class="fab fa-instagram"></i> Instagram';

                instagramLinkA.addEventListener('click', () => {
                    handleClick(streamer.instagramURL);
                });

                instagramLink.appendChild(instagramLinkA);

                const twitterLink = document.createElement('li');
                const twitterLinkA = document.createElement('a');
                twitterLinkA.href = streamer.twitterURL;
                twitterLinkA.target = '_blank';
                twitterLinkA.innerHTML = '<i class="fab fa-twitter"></i> Twitter';

                twitterLinkA.addEventListener('click', () => {
                    handleClick(streamer.twitterURL);
                });

                twitterLink.appendChild(twitterLinkA);

                streamerLinks.appendChild(twitchLink);
                streamerLinks.appendChild(instagramLink);
                streamerLinks.appendChild(twitterLink);

                const statusIndicator = document.createElement('span');
                statusIndicator.classList.add('status-indicator');

                streamerElement.appendChild(streamerName);
                streamerElement.appendChild(streamerLinks);
                streamerElement.appendChild(statusIndicator);

                streamerContainer.appendChild(streamerElement);
            })
        })
    }

    updateStreamers()
    socket.on("updateStreamers", () => {
        updateStreamers()
    })
})