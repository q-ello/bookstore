import { books } from "./js/books";
import { initCart } from "./js/cart";
import { slider } from "./js/slider";

document.addEventListener('DOMContentLoaded', () => {
    initCart()
    slider();
    books();
})