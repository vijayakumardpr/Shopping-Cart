// const shop = document.getElementById("shop")

// let busket = JSON.parse(localStorage.getItem("data")) || []

// function getItems() {
//   const itemHtml = shopCartItems
//     .map((item) => {
//       const { id, image, name, desc, price } = item
//       let search = busket.find((x) => x.id === id) || []

//       return `
//       <div class="item">
//         <img width="220" src=${image} alt="image1" />
//         <div class="details">
//           <h3>${name}</h3>
//           <p>${desc}</p>
//           <div class="price-quantity">
//             <h2>$ ${price}</h2>
//             <div class="buttons">
//               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
//               <div id=${id} class="quantity">
//               ${search.item === undefined ? 0 : search.item}
//               </div>
//               <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
//             </div>
//           </div>
//         </div>
//       </div>`
//     })
//     .join("")

//   return (shop.innerHTML = itemHtml)
// }

// getItems()

// function increment(id) {
//   let search = busket.find((x) => x.id === id)

//   if (search === undefined) {
//     busket.push({
//       id: id,
//       item: 1,
//     })
//   } else {
//     search.item += 1
//   }
//   update(id)
//   localStorage.setItem("data", JSON.stringify(busket))
// }

// function decrement(id) {
//   let search = busket.find((x) => x.id === id)

//   if (search === undefined || search.item === 0) return

//   search.item -= 1

//   update(id)
//   busket = busket.filter((x) => x.item !== 0)
//   localStorage.setItem("data", JSON.stringify(busket))
// }

// function update(id) {
//   let search = busket.find((x) => x.id === id)
//   document.getElementById(id).innerHTML = search.item
//   calculation()
// }

// function calculation() {
//   let cartIcon = document.getElementById("cartAmount")
//   let total = busket.map((x) => x.item).reduce((pre, cur) => pre + cur, 0)
//   cartIcon.innerHTML = total
// }

// calculation()

const shop = document.getElementById("shop")

let basket = JSON.parse(localStorage.getItem("data")) || []

function getItems() {
  let itemHtml = shopCartItems
    .map((x) => {
      let { id, name, price, desc, image } = x
      let search = basket.find((x) => x.id === id)
      return `<div class="item">
    <img width="220" src=${image} alt="image1" />
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">
          ${search === undefined ? 0 : search.item}
          </div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
    </div>`
    })
    .join("")
  return (shop.innerHTML = itemHtml)
}

getItems()

function increment(id) {
  let search = basket.find((x) => x.id === id)
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    })
  } else {
    search.item += 1
  }

  update(id)

  localStorage.setItem("data", JSON.stringify(basket))
}

function decrement(id) {
  let search = basket.find((x) => x.id === id)

  if (search === undefined || search.item === 0) return

  search.item -= 1

  update(id)
  basket = basket.filter((x) => x.item !== 0)
  localStorage.setItem("data", JSON.stringify(basket))
}

function update(id) {
  let search = basket.find((x) => x.id === id)
  document.getElementById(id).innerHTML = search.item
  calculation()
}

function calculation() {
  let totalNumberCart = document.getElementById("cartAmount")
  let itemsTotal = basket.map((x) => x.item).reduce((pre, cur) => pre + cur, 0)
  totalNumberCart.innerHTML = itemsTotal
}

calculation()
