import booksTmpl from 'Modules/book.pug'
import { cartArray, toggleCart } from './cart';

export const books = () => {
    const booksElm = document.getElementById('js-books-container')
    const categories = document.querySelectorAll('.category')
    const loadBtn = document.querySelector('.load-btn')

    let active = 0;
    let startIndex = 0

    const key = 'AIzaSyBMVfxruefKCoEjYFs4vLL45x3XZ-5PgDo'

    const getBooks = (num) => {
        loadBtn.style.display = 'none'
        const portionOfBooks = document.createElement('div')
        portionOfBooks.classList.add('books')
        if (active !== num) {
            categories[active].classList.remove('active')
            categories[active].disabled = false
            active = num
        }
        portionOfBooks.innerHTML = 'Loading...'

        categories[num].classList.add('active')
        categories[num].disabled = true

        const category = categories[active].innerText
        const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${key}&printType=books&startIndex=${startIndex}&maxResults=6`

        let booksHtml = ''

        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                data.items.forEach(item => {
                    booksHtml += booksTmpl({
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ11Um8b7BGktJ2ux-YE42Op7h0eSwsutvIh1tN2cZXRxPg5Q8KSj2HmN3DwipVM4Sd5Is&usqp=CAU',
                        authors: item.volumeInfo.authors.filter(Boolean).join(', '),
                        title: item.volumeInfo.title,
                        rating: item.volumeInfo.averageRating ? item.volumeInfo.averageRating : '',
                        reviews: item.volumeInfo.averageRating ? item.volumeInfo.ratingsCount : '',
                        description: item.volumeInfo.description,
                        price: item.saleInfo.retailPrice ? item.saleInfo.retailPrice.amount : '',
                        id: item.id,
                        inTheCart: cartArray.indexOf(item.id) != -1
                    })
                })
                loadBtn.style.display = 'block'
                portionOfBooks.innerHTML = booksHtml

                const buttons = portionOfBooks.querySelectorAll('.book-btn')
                buttons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        toggleCart(e.target.id)
                    })
                })
            })
            .catch(() => {
                portionOfBooks.innerHTML = 'Something went wrong :('
            })

            return portionOfBooks
    }

    categories.forEach((category, index) => {
        category.addEventListener('click', () => {
            startIndex = 0
            booksElm.innerHTML = ''
            booksElm.append(getBooks(index))
        })
    })

    booksElm.append(getBooks(0))

    loadBtn.addEventListener('click', () => {
        startIndex += 1
        const anotherElm = getBooks(active)
        booksElm.append(anotherElm)
    })
}