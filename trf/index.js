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
    const phoneInput = form.querySelector('input[name="Телефон"]');
    const phoneError = document.getElementById("phone-error");

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

        const rawPhone = phoneInput.value.trim();
        const phoneObj = validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || isObviouslyFakeNumber(digits)) {
            phoneError.style.opacity = "1";
            phoneInput.classList.add("input-error");
            return;
        }

        phoneError.style.display = "none";
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

        const submitBtn = document.getElementById("submit-btn-1");
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbxd-gwNeUcDBKelZVbtIobCEJs6jCQBVCyO9B7XPCmbkPsIrBa2MOERNREOf0q491Sx/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    fbq('track', 'Lead');

                    const baseUrl = "https://t.me/vladushakovai_bot";
                    const startParam = "69440d169492d7f4fc003e1a";

                    const getVal = name =>
                        encodeURIComponent(form.querySelector(`input[name="${name}"]`)?.value || "");


                    const nameField = form.querySelector('input[name="Ім\'я"]');
                    const nameValue = nameField ? encodeURIComponent(nameField.value.trim()) : "";

                    const tgUrl =
                        `${baseUrl}?start=${startParam}` +
                        `&eid=${Date.now()}`+
                        `name=${nameValue}` +
                        `&phone=${encodeURIComponent(normalizedPhone)}` +
                        `&utm_source=${getVal("utm_source")}` +
                        `&utm_campaign=${getVal("utm_campaign")}` +
                        `&utm_content=${getVal("utm_content")}` +
                        `&utm_term=${getVal("utm_term")}`;

                    setTimeout(() => window.location.href = tgUrl, 10);
                }
            });
    });
});

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};
