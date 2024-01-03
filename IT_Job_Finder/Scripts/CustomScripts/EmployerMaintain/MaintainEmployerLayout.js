function resetNavOption(currentNav) {
    let options = document.getElementsByClassName("nav-option");
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("option-active");
    }
    document.getElementById(currentNav).classList.add("option-active");
}

//Function used to format currency
function formatCurrency(value) {
    const stringValue = String(value);
    const dotIndex = stringValue.indexOf('.');
    const parts = dotIndex === -1 ? [stringValue] : stringValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const result = parts.join('.') + ' VND';
    return result;
}

//Function used to riderect to business details page
const redirectToBusinessDetail = (jobID) => {
    window.location.href = `http://localhost:56673/Business/Details/${jobID}`;
}