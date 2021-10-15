export default function direccionScroll() {
    var scrollPos = 0;
    const d = document;
window.addEventListener('scroll', function(){
  let valor= ((d.body.getBoundingClientRect()).top > scrollPos) ? "arriva" : "abajo";
  scrollPos = (d.body.getBoundingClientRect()).top;
  console.log(valor);
  if (valor==="arriva") {
      d.getElementById("asideMenu").classList.remove("d-none");
      d.getElementById("asideMenu").classList.add("d-block");
      d.getElementById("footerMenu").classList.add("animate__fadeInUp");
      d.getElementById("footerMenu").classList.remove("animate__fadeOutDown");
    } else{
        d.getElementById("footerMenu").classList.add("animate__fadeOutDown");
        d.getElementById("footerMenu").classList.remove("animate__fadeInUp");
        setTimeout(() => {
            d.getElementById("asideMenu").classList.add("d-none",);
        d.getElementById("asideMenu").classList.remove("d-block");
        }, 500);
  }
});
}