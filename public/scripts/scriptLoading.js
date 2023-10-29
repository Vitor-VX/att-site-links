document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var loaderContainer = document.querySelector('.loader-container');
        var hiddenContent = document.querySelector('.hidden-content');
        loaderContainer.style.display = "none";
        hiddenContent.style.display = "block";
        document.body.style.overflow = "auto";
    }, 10);
});