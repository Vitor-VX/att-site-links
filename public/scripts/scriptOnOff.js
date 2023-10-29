/* @DESENVOLVEDOR JV */
require("dotenv").config()

async function checkAllStreamersStatus(twitchClientId, TokenAuth) {
    const res = await axios.get(`http://localhost:3000/lives/joaovictorvx.api.lives`)
    const TwitchLivesLinks = res.data.loadStreamer

    for (const URLTwitch of TwitchLivesLinks) {
        const link = URLTwitch.twitchURL.split('/')[3]

        try {
            const responseLivesAoVivo = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${link}`, {
                headers: {
                    'Client-ID': twitchClientId,
                    'Authorization': `Bearer ${TokenAuth}`
                }
            })

            const data = responseLivesAoVivo.data

            const streamerElement = GetStreamerElementByLink(`https://www.twitch.tv/${link}`);

            if (streamerElement) {
                let statusIndicator = streamerElement.querySelector('.status-indicator');

                data && data.data.length > 0 ? updateStatusIndicator(statusIndicator, 'ON') : updateStatusIndicator(statusIndicator, 'OFF')
            }
        } catch (error) {
            console.error(`Ocorreu um erro ao verificar o status de alguns streamers.`);
        }
    }
}

// Encontra o elemento da caixa "streamer" com base no link do Twitch
const GetStreamerElementByLink = (link) => {
    const streamerElements = document.querySelectorAll('.streamer');

    for (const element of streamerElements) {
        const twitchLink = element.querySelector('a')?.getAttribute('href');

        if (twitchLink === link) {
            return element;
        }
    }

    return null;
}

const updateStatusIndicator = (statusIndicator, status) => {
    if (statusIndicator) {
        if (status === 'ON') {
            statusIndicator.textContent = 'Ao vivo'
            statusIndicator.classList.add('ao', 'vivo');
        } else {
            statusIndicator.textContent = '';
            statusIndicator.classList.remove('ao', 'vivo');
        }
    }
}

checkAllStreamersStatus(process.env.CLIENT_ID, process.env.TOKEN_ID);