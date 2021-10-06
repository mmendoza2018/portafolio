export default function clickAsideMenu (classElement) {
    const d= document;
    d.addEventListener("click",() => {
        if (event.target.matches(`.${classElement} *`)) {
            d.querySelectorAll("#asideMenu a").forEach((e) => {
                console.log(e.classList.contains("box-item-aside"));
                if(e.classList.contains("box-item-aside")) e.classList.remove("box-item-aside")
            })
            event.target.parentElement.classList.add("box-item-aside")
        }
    })
}