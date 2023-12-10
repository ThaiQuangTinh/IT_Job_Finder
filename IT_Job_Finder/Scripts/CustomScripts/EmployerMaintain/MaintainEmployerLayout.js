function resetNavOption(currentNav) {
    let options = document.getElementsByClassName("nav-option");
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("option-active");
    }
    document.getElementById(currentNav).classList.add("option-active");
}