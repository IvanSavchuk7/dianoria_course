// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("form");
//
//     form.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const submitBtn = document.getElementById("submit-btn-2");
//         submitBtn.disabled = true;
//
//         const formData = new FormData(form);
//
//         fetch("https://script.google.com/macros/s/AKfycbxk-8uFdbovzD4Z9sh9OAi3lhIyVNLqL8QayUPWNDM4SxPUuBsGaCWrcTGd-AS4RQBi/exec", {
//             method: "POST",
//             body: formData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.result === "success") {
//                     setTimeout(() => {
//                         window.location.href = "https://ai-expert.space/finish/";
//                     }, 10);
//                 }
//             });
//     });
// });

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};