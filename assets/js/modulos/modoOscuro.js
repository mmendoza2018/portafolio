export default function darkMode(idBoton) {
    const d = document;
    let sol = "☀️",
        luna = "🌙",
        boton = d.getElementById(idBoton);

    const asignarColores = (boton) => {
        let listaElPrincipal = d.querySelectorAll("[data-darkPrincipal]"),
            valueDarkMode = localStorage.getItem("darkMode"),
            listaElSecundario = d.querySelectorAll("[data-darkSecundario]");
        if (boton.textContent === sol) {
            localStorage.setItem("darkMode", false)
            boton.textContent = luna;
            boton.style.cssText = "background-color: black !important";
        } else {
            localStorage.setItem("darkMode", true)
            boton.textContent = sol;
            boton.style.cssText = "background-color: white !important";
        }
        listaElPrincipal.forEach(e => {
            (localStorage.getItem("darkMode") === "true") ?
            e.classList.add("darkmode-principal"): e.classList.remove("darkmode-principal")
        });
        listaElSecundario.forEach(e => {
            (localStorage.getItem("darkMode") === "true") ?
            e.classList.add("darkmode-secundario"): e.classList.remove("darkmode-secundario")
        });
    }

    if (localStorage.getItem("darkMode") === "true") {
        asignarColores(boton)
    }

    d.addEventListener("click", (e) => {
        if (e.target.matches(`#${idBoton}`)) {
            asignarColores(boton)
        }
    })
}