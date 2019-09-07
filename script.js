const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGetRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    }

    xhr.send();
  });
}

function makePostRequest(url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
}

function makeDeleteRequest(url, id) {
  // id - надо запихнуть в url я полагаю
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', url);
  xhr.send();
}

class GoodsItem {
  constructor(title = 'no name', price = 'no price') {
    this.title = title;
    this.price = price;
  }

  addGoods() {
    const addedGood = JSON.stringify({ product_name: this.title, price: this.price });
    makePostRequest(`${BASE_URL}/addToBasket.json`, addedGood);
  }

  render() {
    this.addGoods();
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(container = '.container') {
    this.container = container;
    this.goods = [];
  }

  fetchGoods() {
    return new Promise((resolve, reject) => {
      makeGetRequest(`${BASE_URL}/catalogData.json`)
        .then((response) => {
          this.goods = JSON.parse(response);
          resolve();
        })
    });
  }

  calculate() {
    return this.goods.reduce((total, item) => {
      if (!good.price) return total;
      return total += item.price
    }, 0);
  }

  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.product_name, item.price);

      return acc += good.render();
    }, '');
  };
}

class CartGoodsList {
  constructor() {

  }

  fetchCartGoods() {
    makeGetRequest(`${BASE_URL}/getBasket.json`)
      .then((response) => {
        this.goods = JSON.parse(response);
      })
  }

  calculate() {
    //подсчет общей стоимости товара в корзине
  }

  incrementItem(item) {
    // обработчик события
    // увеличение количества товара
  }

  decrementItem(item) {
    // обработчик события
    // уменьшение количества товара
  }

  removeItem(item) {
    makeDeleteRequest(`${BASE_URL}/deleteFromBasket.json`, item.id);
  }

  render() {
    // отрисовка данных на странице
  }
}

class CartGoodsItem {
  constructor(title, price) {
  }

  render() {
    // возврат HTML по одному товару
  }
}

const list = new GoodsList('.goods-list');
list.fetchGoods()
  .then(() => list.render());
