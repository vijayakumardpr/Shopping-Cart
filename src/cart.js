const shoppingCart = document.getElementById("shopping-cart")
const label = document.getElementById("label")

let busket = JSON.parse(localStorage.getItem("data")) || []

function calculation() {
  let cartIcon = document.getElementById("cartAmount")
  let total = busket.map((x) => x.item).reduce((pre, cur) => pre + cur, 0)
  cartIcon.innerHTML = total
}

calculation()

function generateCartItems() {
  if (busket.length !== 0) {
    let itemHtml = busket
      .map((x) => {
        let { id, item } = x
        let search = shopCartItems.find((x) => x.id === id)
        let { image, price, name } = search
        return `
        <div class="cart-item">
        <img width="100" src=${image} alt="" />
        <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

            <h3>$ ${item * price}</h3>

        </div>
      </div>

      `
      })
      .join("")
    shoppingCart.innerHTML = itemHtml
  } else {
    shoppingCart.innerHTML = ""
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
        <button class="home-btn">Back to Home </button>
    </a>

    `
  }
}

generateCartItems()

function increment(id) {
  let search = busket.find((x) => x.id === id)

  if (search === undefined) {
    busket.push({
      id: id,
      item: 1,
    })
  } else {
    search.item += 1
  }
  update(id)
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(busket))
}

function decrement(id) {
  let search = busket.find((x) => x.id === id)

  if (search === undefined || search.item === 0) return

  search.item -= 1

  update(id)
  busket = busket.filter((x) => x.item !== 0)
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(busket))
}

function update(id) {
  let search = busket.find((x) => x.id === id)
  document.getElementById(id).innerHTML = search.item
  calculation()
  totalAmount()
}

function removeItem(id) {
  busket = busket.filter((x) => x.id !== id)
  generateCartItems()
  totalAmount()
  calculation()
  localStorage.setItem("data", JSON.stringify(busket))
}

function totalAmount() {
  if (busket.length !== 0) {
    let total = busket
      .map((x) => {
        let { id, item } = x
        let search = shopCartItems.find((y) => y.id === id)

        return search.price * item
      })
      .reduce((pre, cur) => pre + cur, 0)

    label.innerHTML = `
      <h2>Total Bill: $ ${total}</h2>
      <div class="final-cart">
        <button class="btn green"> Check out</button>
        <button onclick="removeCart()" class="btn red" >Clear cart</button>
      </div>
      `
  }
}

totalAmount()

function removeCart() {
  busket = []
  generateCartItems()
  calculation()
  localStorage.setItem("data", JSON.stringify(busket))
}
