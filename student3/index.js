var swiper1 = new Swiper(".feedback-swiper", {
    slidesPerView: 3,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    mousewheel: false,
    direction: 'horizontal',
    loop: true,


    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1.3,
            spaceBetween: 25,
        },
        601: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        831: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 25,
            mousewheel: false,
        },
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("header-form");
    if (!form) return;

    UTMUtils.captureUTMs();
    UTMUtils.applyUTMs(form);

    FormUtils.insertHidden(
        form,
        "page_source",
        window.location.origin + window.location.pathname
    );
    FormUtils.insertHidden(form, "Час", new Date().toLocaleTimeString("uk-UA"));

    const phoneInput = form.querySelector('input[name="Телефон"]');
    const phoneError = document.getElementById("phone-error");
    const submitBtn = document.getElementById("submit-btn-1");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (form.dataset.submitted === "true") return;
        form.dataset.submitted = "true";

        const rawPhone = phoneInput.value.trim();
        const phoneObj = PhoneUtils.validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || PhoneUtils.isObviouslyFakeNumber(digits)) {
            phoneError.style.opacity = "1";
            phoneInput.classList.add("input-error");
            form.dataset.submitted = "false";
            return;
        }

        phoneError.style.opacity = "0";
        phoneInput.classList.remove("input-error");

        const normalizedPhone = phoneObj.number;
        phoneInput.value = normalizedPhone;

        const eid = Date.now();
        FormUtils.insertHidden(form, "eid", eid);

        submitBtn.disabled = true;

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbwqKBO09-6FBjfAv5gDCb4naN1r75RZ4vrUq_RyvsGHBZZNsCIMdCZuNPlVvq0JyMsN0A/exec",
                {
                    method: "POST",
                    body: new FormData(form)
                }
            );
        } catch (err) {
            console.error("Google Sheets error:", err);
        }

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }

        const baseUrl = "https://tg.pulse.is/vladushakovai_bot";
        const startParam = "68e529fc5bc846e96f0daaaa";

        const tgUrl =
            `${baseUrl}?start=${startParam}` +
            `&eid=${eid}` +
            `&phone=${encodeURIComponent(normalizedPhone)}` +
            `&utm_source=${UTMUtils.getUTM("utm_source")}` +
            `&utm_campaign=${UTMUtils.getUTM("utm_campaign")}` +
            `&utm_content=${UTMUtils.getUTM("utm_content")}` +
            `&utm_term=${UTMUtils.getUTM("utm_term")}` +
            `&utm_medium=${UTMUtils.getUTM("utm_medium")}`;

        setTimeout(() => {
            window.location.href = tgUrl;
        }, 50);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    if (!form) return;

    UTMUtils.captureUTMs();
    UTMUtils.applyUTMs(form);

    FormUtils.insertHidden(
        form,
        "page_source",
        window.location.origin + window.location.pathname
    );
    FormUtils.insertHidden(form, "Час", new Date().toLocaleTimeString("uk-UA"));

    const phoneInput = form.querySelector('input[name="Телефон"]');
    const phoneError = document.getElementById("phone-error1");
    const submitBtn = document.getElementById("submit-btn-2");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (form.dataset.submitted === "true") return;
        form.dataset.submitted = "true";

        const rawPhone = phoneInput.value.trim();
        const phoneObj = PhoneUtils.validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || PhoneUtils.isObviouslyFakeNumber(digits)) {
            phoneError.style.opacity = "1";
            phoneInput.classList.add("input-error");
            form.dataset.submitted = "false";
            return;
        }

        phoneError.style.opacity = "0";
        phoneInput.classList.remove("input-error");

        const normalizedPhone = phoneObj.number;
        phoneInput.value = normalizedPhone;

        const eid = Date.now();
        FormUtils.insertHidden(form, "eid", eid);

        submitBtn.disabled = true;

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbwqKBO09-6FBjfAv5gDCb4naN1r75RZ4vrUq_RyvsGHBZZNsCIMdCZuNPlVvq0JyMsN0A/exec",
                {
                    method: "POST",
                    body: new FormData(form)
                }
            );
        } catch (err) {
            console.error("Google Sheets error:", err);
        }

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }

        const baseUrl = "https://tg.pulse.is/vladushakovai_bot";
        const startParam = "68e529fc5bc846e96f0daaaa";

        const tgUrl =
            `${baseUrl}?start=${startParam}` +
            `&eid=${eid}` +
            `&phone=${encodeURIComponent(normalizedPhone)}` +
            `&utm_source=${UTMUtils.getUTM("utm_source")}` +
            `&utm_campaign=${UTMUtils.getUTM("utm_campaign")}` +
            `&utm_content=${UTMUtils.getUTM("utm_content")}` +
            `&utm_term=${UTMUtils.getUTM("utm_term")}` +
            `&utm_medium=${UTMUtils.getUTM("utm_medium")}`;

        setTimeout(() => {
            window.location.href = tgUrl;
        }, 50);
    });
});

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};