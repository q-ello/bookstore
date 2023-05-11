export const slider = () => {
    const images = document.querySelectorAll('.image')
    const dots = document.querySelectorAll('.dot')

    let active = 0

    function moveSlider(num) {
        if (dots[num] === active) {
            return
        }
        images[active].classList.remove('active')
        images[num].classList.add('active')
        dots[active].classList.remove('active')
        dots[num].classList.add('active')
        active = num
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            moveSlider(index);
        })
    });

    setInterval(() => {
        let num = active === images.length - 1 ? 0 : active + 1;
        moveSlider(num);
    }, 5000)
}