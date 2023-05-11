export let cartArray

const cart = document.querySelector('.cart-badge')

const showBadge = (num) => {
    if (num) {
        cart.innerText = num
        cart.style.display = 'block'
    } else {
        cart.style.display = 'none'
    }
}

export const initCart = () => {
    if (localStorage.getItem('cart') === null) {
        cartArray = []
        localStorage.setItem('cart', JSON.stringify(cartArray))
    } else {
        cartArray = JSON.parse(localStorage.getItem('cart'))
    }
    showBadge(cartArray.length)
}



export const toggleCart = (id) => {
    const button = document.getElementById(id)
    if (button.classList.contains('to-buy')) {
        cartArray.push(id)
        button.classList.remove('to-buy')
        button.classList.add('in-the-cart')
        button.innerText = 'in the cart'
    } else {
        cartArray = cartArray.filter(item => item != id)
        button.classList.remove('in-the-cart')
        button.classList.add('to-buy')
        button.innerText = 'buy now'

    }
    localStorage.setItem('cart', JSON.stringify(cartArray))
    showBadge(cartArray.length)
}