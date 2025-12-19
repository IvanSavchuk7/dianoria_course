window.addEventListener("load", () => {
    const iframe = document.getElementById("promo-video");
    const overlay = document.querySelector(".video-overlay");
    const player = new Vimeo.Player(iframe);

    overlay.addEventListener("click", () => {
        player.setMuted(false);
        player.play();
        overlay.classList.add("hidden");
    });
});