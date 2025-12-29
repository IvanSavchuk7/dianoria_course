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

function isObviouslyFakeNumber(num) {
    const digits = num.replace(/\D/g, "");
    if (/^(\d)\1{5,}$/.test(digits)) return true;
    const unique = new Set(digits.split(""));
    if (unique.size <= 2) return true;
    if (/(012345|123456|234567|345678|456789|987654|876543)/.test(digits)) return true;
    if (digits.length < 7 || digits.length > 15) return true;
    const voipPatterns = [/^178[45]/, /^447520/];
    if (voipPatterns.some(r => r.test(digits))) return true;
    return false;
}

function validatePhone(rawPhone) {
    rawPhone = rawPhone.trim();
    let phone;
    try {
        phone = libphonenumber.parsePhoneNumberFromString(rawPhone);
        if (phone && phone.isValid()) return phone;
    } catch {}
    if (!rawPhone.startsWith("+")) {
        try {
            phone = libphonenumber.parsePhoneNumberFromString("+" + rawPhone);
            if (phone && phone.isValid()) return phone;
        } catch {}
    }
    try {
        phone = libphonenumber.parsePhoneNumberFromString(rawPhone, "UA");
        if (phone && phone.isValid()) return phone;
    } catch {}
    const fallbackCountries = ["PL", "DE", "RO", "BG", "CZ", "SK", "US", "GB", "FR", "ES", "RS"];
    for (const c of fallbackCountries) {
        try {
            phone = libphonenumber.parsePhoneNumberFromString(rawPhone, c);
            if (phone && phone.isValid()) return phone;
        } catch {}
    }
    return null;
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    if (!form) return;

    const phoneInput = form.querySelector('input[name="Телефон"]');
    const phoneError = document.getElementById("phone-error");
    const submitBtn = document.getElementById("submit-btn-1");

    const UTM_KEYS = ["utm_source", "utm_campaign", "utm_content", "utm_term"];

    const urlParams = new URLSearchParams(window.location.search);

    UTM_KEYS.forEach(key => {
        const value = urlParams.get(key);
        if (value) {
            localStorage.setItem(key, value);
        }
    });

    UTM_KEYS.forEach(key => {
        const storedValue = localStorage.getItem(key);
        const hiddenInput = form.querySelector(`input[name="${key}"]`);
        if (hiddenInput && storedValue) {
            hiddenInput.value = storedValue;
        }
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        /* --- block double submit --- */
        if (form.dataset.submitted === "true") return;
        form.dataset.submitted = "true";

        /* --- phone validation --- */
        const rawPhone = phoneInput.value.trim();
        const phoneObj = validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || isObviouslyFakeNumber(digits)) {
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

        let eidField = form.querySelector('input[name="eid"]');
        if (!eidField) {
            eidField = document.createElement("input");
            eidField.type = "hidden";
            eidField.name = "eid";
            form.appendChild(eidField);
        }
        eidField.value = eid;

        let phoneSendpulse = form.querySelector('input[name="Телефон sendpulse"]');
        if (!phoneSendpulse) {
            phoneSendpulse = document.createElement("input");
            phoneSendpulse.type = "hidden";
            phoneSendpulse.name = "Телефон sendpulse";
            form.appendChild(phoneSendpulse);
        }
        phoneSendpulse.value = normalizedPhone;

        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);

            await fetch(
                "https://script.google.com/macros/s/AKfycbwpakXtp9LQTUH2L9nhlrR6IIb2O3_9Ia9XGGfD4_B7QgooQPzIwlCQGoLkfEFdppq7Sw/exec",
                {
                    method: "POST",
                    body: formData
                }
            );
        } catch (err) {
            console.error("Google Sheet error:", err);
        }

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }

        const baseUrl = "https://t.me/vladushakovai_bot";
        const startParam = "69465b93f5c12fd74209f654";

        const getUTM = key => encodeURIComponent(localStorage.getItem(key) || "");

        const nameValue = encodeURIComponent(
            form.querySelector('input[name="Ім\'я"]')?.value.trim() || ""
        );

        const tgUrl =
            `${baseUrl}?start=${startParam}` +
            `&eid=${eid}` +
            `&name=${nameValue}` +
            `&phone=${encodeURIComponent(normalizedPhone)}` +
            `&utm_source=${getUTM("utm_source")}` +
            `&utm_campaign=${getUTM("utm_campaign")}` +
            `&utm_content=${getUTM("utm_content")}` +
            `&utm_term=${getUTM("utm_term")}`;

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