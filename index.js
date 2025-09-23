var swiper1 = new Swiper(".feedback-swiper", {
    slidesPerView: 1,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    mousewheel: false,
    direction: 'horizontal',
    loop: true,


    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        601: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1080: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 25,
            mousewheel: false,
        },
    }
});
var swiper2 = new Swiper(".results-swiper", {
    slidesPerView: 1.35,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    mousewheel: false,
    direction: 'horizontal',
    loop: true,


    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        601: {
            slidesPerView: 1.35,
            spaceBetween: 20,
        },
        1080: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 25,
            mousewheel: false,
        },
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("header-form");

    const urlParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_campaign", "utm_content", "utm_term"].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            const hiddenInput = document.querySelector(`input[name="${param}"]`);
            if (hiddenInput) hiddenInput.value = value;
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submit-btn-1");


        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbwu3IUA-HvLVrujAtZt2n8aQg8_osF71UGobFxpaYSc20Rdp_magBiJTXnbVWBhf6hO/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    setTimeout(() => {
                        window.location.href = "https://google.com";
                    }, 100);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submit-btn-2");


        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbwu3IUA-HvLVrujAtZt2n8aQg8_osF71UGobFxpaYSc20Rdp_magBiJTXnbVWBhf6hO/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    setTimeout(() => {
                        window.location.href = "https://google.com";
                    }, 100);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};

document.documentElement.classList.add('fonts-loading');
if ('fonts' in document) {
    document.fonts.ready.then(() => {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-ready');
    });
} else {
    window.addEventListener('load', () => {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-ready');
    });
}