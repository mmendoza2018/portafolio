import contenidoResponsivo from "./modulos/contenidoResponsivo.js";
import clickAsideMenu from "./modulos/clickAsideMenu.js";
import direccionScroll from "./modulos/direccionScroll.js";
import darkMode from "./modulos/modoOscuro.js";
import progress from "./modulos/progress.js";
import loaders from "./modulos/loaders.js";


function ocultarLoader() {
    let loader = document.getElementById("seccionLoader");
    loader.classList.add("d-none")
}

/* funcion para mostrar el loader de carga */
function verLoader() {
    let loader = document.getElementById("seccionLoader");
    loader.classList.remove("d-none")
}

document.addEventListener("DOMContentLoaded", () => {
    loaders();
    clickAsideMenu("btnAside");
    if (document.getElementById("footerMenu") === null) {
        return
    } else {
        direccionScroll();
    }
    
})
window.addEventListener("load", () => {
    ocultarLoader();
    darkMode("btnDarkMode");
    aplicarTooltips()
    progress();
    alertCustomize()
    cargarContenido("contenidoPrincipal", "index", "principal.html")
    cargarContenido("contenidoPrincipal", "habilidades", "habilidades.html")
    cargarContenido("contenidoPrincipal", "conoceme", "conoceme.html")
    cargarContenido("contenidoPrincipal", "proyectos", "proyectos.html")
    cargarContenido("contenidoPrincipal", "contacto", "contacto.html")
})

/* document.querySelector("a.y").style.cssText="color:white !important" */
let contenidoAside = `<footer id="footerMenu" data-darkSecundario class="fixed-bottom animate__animated  animate__fadeInUp rounded-top shadow-lg bg-principal mt-5">
<div class="row">
<div class="col-3 col-md-3 col-lg-2 text-center">
<a href="#" data-darkSecundario class="btn btnAside px-1">
<i class='bx bxs-archive bx-sm proyectos'></i>
<small class="d-block py-0 px- proyectos">Proyectos</small>
    </a>
    </div>
    <div class="col-3 col-md-3 col-lg-2 text-center">
    <a href="#" data-darkSecundario class="btn btnAside px-1">
    <i class='bx bxs-bar-chart-alt-2 bx-sm habilidades' ></i>
    <small class="d-block py-0 px-0 habilidades">Habilidades</small>
    </a>
    </div>
    <div class="col-3 col-md-3 col-lg-2 text-center">
    <a href="#" data-darkSecundario class="btn btnAside px-1">
    <i class='bx bxs-user-circle bx-sm conoceme'></i>
<small class="d-block py-0 px-0 conoceme">Conóceme</small>
</a>
</div>
    <div class="col-3 col-md-3 col-lg-2 text-center">
    <a href="#" data-darkSecundario class="btn btnAside px-1">
    <i class='bx bxs-phone-call bx-sm contacto'></i>
    <small class="d-block py-0 px-0 contacto">Contacto</small>
    </a>
    </div>
    </div>
    </footer>`
contenidoResponsivo("#asideMenu", "", contenidoAside );

function cargarContenido(idContenedor, claseBoton, url) {
    document.addEventListener("click", async () => {
        if (event.target.matches(`.${claseBoton}`)) {
            verLoader();
            try {
                let peticion = await fetch(url);
                if (!peticion.ok) throw {
                    error: "sucedio un error ayuda !"
                }
                let respuesta = await peticion.text();
                document.getElementById(idContenedor).innerHTML = respuesta;
                
                if (localStorage.getItem("darkMode") === "true") {
                    let listaElPrincipal = document.querySelectorAll("[data-darkPrincipal]"),
                        listaElSecundario = document.querySelectorAll("[data-darkSecundario]");
                    listaElPrincipal.forEach(e => {
                        (localStorage.getItem("darkMode") === "true") ?
                        e.classList.add("darkmode-principal"): e.classList.remove("darkmode-principal")
                    });
                    listaElSecundario.forEach(e => {
                        (localStorage.getItem("darkMode") === "true") ?
                        e.classList.add("darkmode-secundario"): e.classList.remove("darkmode-secundario")
                    });
                }
                
                ocultarLoader();
                if (url === "habilidades.html") progress("[data-progress]");
            } catch (error) {
                console.log(error);
            }

        }
    })

}
function alertCustomize = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Ultima actualizacion septiembre 15, 2021'
    })
}

function envioForm() {
    let valido = true;
    let formulario = document.getElementById("formContacto");
    formulario.querySelectorAll("[data-validate]").forEach(e => {
        if (e.value.length===0) {
            alerta("Complete todos los campos del formulario")
            valido = false;
        }
    })
    console.log(valido, valido === false);
    if (valido === false) return
    verLoader()
    fetch("https://formsubmit.co/ajax/mendoza.ing1826@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formulario.nombre.value,
                correo: formulario.correo.value,
                message: formulario.asunto.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true") {
                fetch("successForm.html")
                    .then(res => res.text())
                    .then(html => document.getElementById("contenidoPrincipal").innerHTML = html)
            } else {
                fetch("errorForm.html")
                    .then(res => res.text())
                    .then(html => document.getElementById("contenidoPrincipal").innerHTML = html)
            }
            ocultarLoader()
        })
        .catch(error => console.log(error));
}

document.addEventListener("click", () => {
    if (event.target.matches("#envioForm")) {
        envioForm()
    }
})

const alerta = (mensaje) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: mensaje
    })
}
const aplicarTooltips = () => {
    var tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltips.forEach((e) => {
        var tooltip = new bootstrap.Tooltip(e, {
            boundary: document.body // or document.querySelector('#boundary')
        })
    })
}
