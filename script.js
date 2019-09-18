const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-item', {
  props: ['good'],
  methods: {
    add() {
      this.$emit('add', this.good.id_product);
    }
  },
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button @click="add">Добавить в корзину</button>
    </div>
  `
});

Vue.component('goods-list', {
  props: ['goods'],
  methods: {
    addTo(id_product) {
      this.$emit('add', id_product);
    }
  },
  template: `
    <div class="goods-list">
      <goods-item
        v-for="good in goods"
        :good="good"
        :key="good.id_product"
        @add="addTo"
      >
      </goods-item>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    isVisibleCart: false
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchLine, 'i');

      return this.goods.filter(good => regexp.test(good.product_name))
    }
  },
  mounted() {
    this.makeGETRequest(`${BASE_URL}/catalogData.json`).then((goods) => {
      this.goods = goods;
    }).catch(err => console.error(err));
  },
  methods: {
    addToCart(id_product) {
      console.log('add product', id_product)
    },
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
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    filterGoods(searchLine) {
      let regexp = new RegExp(`${searchLine}`, 'gi');
      return [...this.goods].filter((good) => regexp.test(good.product_name));
    }
  }
});