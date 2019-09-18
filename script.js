const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class GoodsItem {
//   constructor(id, title = 'No name', price = 'No price') {
//     this.id = id;
//     this.title = title;
//     this.price = price;
//   }
//   render() {
//     return `<div class="goods-item" >
//       <h3>${this.title}</h3>
//       <p>${this.price}</p>
//       <button data-id="${this.id}">Добавить в корзину</button>
//     </div>`;
//   }
// }
//
// class GoodsList {
//   constructor(container = '.container') {
//     this.container = container;
//     this.goods = [];
//     this.filteredGoods = [];
//   }
//   totalPrice() {
//     return this.goods.reduce((total, good) => {
//       if (!good.price) return total;
//       return total += good.price;
//     }, 0);
//   }
//   async fetchGoods() {
//     try {
//       this.goods = await makeGETRequest(`${BASE_URL}/catalogData.json`);
//       this.filteredGoods = [...this.goods];
//       console.log(this.goods);
//       return this.goods;
//     } catch (e) {
//       console.error(e);
//       throw new Error(e);
//     }
//   }
//   filterGoods(value) {
//     console.log(value);
//     const regexp = new RegExp(value, 'i');
//     this.filteredGoods = this.goods.filter((good) => {
//       return regexp.test(good.product_name);
//     });
//     this.render();
//   }
//   addEvents(el = 'button', event = () => {}) {
//     const container = document.querySelector(this.container);
//     const elements = container.querySelectorAll(el);
//     elements.forEach((currentEl) => {
//       currentEl.addEventListener('click', event);
//     })
//   }
//   render() {
//     document.querySelector(this.container).innerHTML = this.filteredGoods.reduce((acc, item) => {
//       const good = new GoodsItem(item.id_product, item.product_name, item.price);
//       return acc += good.render();
//     }, '');
//   }
// }
//
// class Cart extends GoodsList {
//   async add(good) {
//     try {
//       const { result } = await makeGETRequest(`${BASE_URL}/addToBasket.json`);
//       if (!result) {
//         throw new Error('Ошибка добавления');
//       }
//       this.goods.push(good);
//       console.log(this.goods);
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   remove(id) {
//     if (!id) {
//       // clean cart
//       return;
//     }
//   }
//   update(id, good) {}
// }
//
// class CartItem extends GoodsItem {
//   constructor(title = 'No name', price = 'No price', count = 1) {
//     super(title, price);
//     this.count = count;
//   }
// }
//
// const cart = new Cart();
// const list = new GoodsList('.goods-list', cart);
// const searchForm = document.querySelector('.goods-search-from');
// const searchInput = document.querySelector('.goods-search');
// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const value = searchInput.value;
//   list.filterGoods(value);
// });
// list.fetchGoods().then(() => {
//   list.render();
//   list.addEvents('button', (event) => {
//     const buttonEl = event.target;
//     const goodId = buttonEl.getAttribute('data-id');
//     const good = list.goods.find((currentGood) => {
//       return currentGood.id_product == goodId;
//     });
//     cart.add(good);
//   });
// });

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false
  },
  mounted() {
    this.makeGETRequest(`${BASE_URL}/catalogData.json`).then((goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    }).catch(err => console.error(err));
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) reject(response);
            resolve(response);
          }
        };

        xhr.onerror = function (e) {
          reject(e);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    },
    onSearchSubmit(searchLine) {
      this.filteredGoods = this.filterGoods(searchLine)
    },
    filterGoods(searchLine) {
      let regexp = new RegExp(`${searchLine}`, 'gi');
      return [...this.goods].filter((good) => regexp.test(good.product_name));
    }
  }
});