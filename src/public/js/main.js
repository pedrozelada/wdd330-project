
// function to take an optional object and a template and insert the objects as HTML into the DOM
function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../../partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
  
    renderWithTemplate(headerTemplate, headerElement,null, hamButton);
    renderWithTemplate(footerTemplate, footerElement, null, updateYear);
  }

loadHeaderFooter();




function updateYear() {
  const year = document.querySelector("#year");
  const today = new Date();
  year.innerHTML = `© <span class="highlight">${today.getFullYear()} Pedro Rafael Zelada Soruco Tarija-Bolivia</span>`;
}

//document.addEventListener('DOMContentLoaded', () => {

// for year


// For button
function hamButton() {
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});
}
//});