class GoodsItem {
  constructor(title = 'no name', price = 'no price') {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(container = '.container') {
    this.container = container;
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 }
    ];
  }

  calculate() {
    return this.goods.reduce((acc, item) => acc += item.price, 0);
  }

  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.title, item.price);

      return acc += good.render();
    }, '');
  };
}

class CartGoodsList {
  constructor() {

  }

  fetchCartGoods() {
    // подгрузка данных (товаров в корзине)
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
    // обработчик события
    // удаление товара
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
list.fetchGoods();
list.render();
