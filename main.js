const toTop = document.querySelector(".back-to-top")
window.addEventListener("scroll", () => {
    if(window.pageYOffset > 250){
        toTop.classList.add("active")
    }else{
        toTop.classList.remove("active")
    }
});

window.addEventListener("click", () => {
    var element = document.getElementById("instructions");
    element.innerHTML = "Press <code>enter</code> to clear screen or <code>s</code> to save your sketch!";
}, false);
