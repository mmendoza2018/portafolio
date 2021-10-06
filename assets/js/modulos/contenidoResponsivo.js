export default function contenidoResponsivo (idElemento,vistaPc, vistaMovil) {
    const d= document;
    const responsive = (e) =>{
            if (e.matches) {
                document.querySelector(idElemento).innerHTML=vistaPc
            }else{
                document.querySelector(idElemento).innerHTML=vistaMovil
            }
    }
    let breakpoint = window.matchMedia("(min-width:720px)")
    breakpoint.addListener(responsive)
    responsive(breakpoint)
    console.log("innerWidht"+ window.innerWidth);
}