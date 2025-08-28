document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os elementos do DOM
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const volumeSlider = document.getElementById('volume-slider');
    const albumArt = document.getElementById('album-art');

    // Função para atualizar a UI (interface do usuário)
    function updateUI(playing) {
        if (playing) {
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
            albumArt.classList.add('playing');
        } else {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            albumArt.classList.remove('playing');
        }
    }

    // Função para tocar ou pausar a rádio
    function togglePlayPause() {
        if (audioPlayer.paused) {
            // Tenta tocar o áudio
            const playPromise = audioPlayer.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // A reprodução começou com sucesso
                    updateUI(true);
                }).catch(error => {
                    // A reprodução falhou (geralmente bloqueio de autoplay)
                    console.error("Erro ao tentar tocar o áudio:", error);
                    // Forçamos o recarregamento do stream e tentamos de novo
                    // Isso é útil para streams ao vivo que podem ter "adormecido"
                    audioPlayer.load();
                    audioPlayer.play();
                    updateUI(true);
                });
            }
        } else {
            // Se já estiver tocando, pausa
            audioPlayer.pause();
            updateUI(false);
        }
    }

    // Função para ajustar o volume
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }

    // Adicionando os "escutadores" de eventos
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', setVolume);

    // Eventos do próprio player para sincronizar a UI
    audioPlayer.onplaying = () => updateUI(true);
    audioPlayer.onpause = () => updateUI(false);
    
    // Iniciar o volume conforme o valor padrão do slider
    setVolume();
});