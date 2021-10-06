export default  function progress(dataAtributte) {
    const d = document;
    const dataAtributtes= d.querySelectorAll(dataAtributte);
    dataAtributtes.forEach(e => {
        for (let i = 0; i <= e.dataset.progress; i++) {
            setTimeout(() => {
                e.style.setProperty("width",`${i}%`)
                e.parentElement.parentElement.children[1].textContent=`${i}%`;
            }, 200);
        }
    });
}