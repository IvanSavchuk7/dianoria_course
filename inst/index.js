document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

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
        submitBtn.disabled = true;
        
        const phoneInput = form.querySelector('input[name="Телефон"]');
        if (phoneInput) {
            let phoneSendpulse = form.querySelector('input[name="Телефон sendpulse"]');
            if (!phoneSendpulse) {
                phoneSendpulse = document.createElement("input");
                phoneSendpulse.type = "hidden";
                phoneSendpulse.name = "Телефон sendpulse";
                form.appendChild(phoneSendpulse);
            }
            phoneSendpulse.value = phoneInput.value;
        }

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbz0BMWSv6LQKeYqny4yEHPQ1xjJ8PktOAHYAyCH0ed-Vd85N5dnsQoVPwZcJ1wyGYp5/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    setTimeout(() => {
                        window.location.href = "https://ai-expert.space/inst/join/";
                    }, 10);
                }
            });
    });
});

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};