const BASE_URL = '';

Vue.component('notification', {
  props: ['error', 'level'],
  computed: {
    errorModel() {
      return this.error.message ? this.error.message : this.error;
    },
    top() {
      return `${(this.level + 1) * 20}px`;
    }
  },
  template: `
    <div class="notification notification--error" :style="{top: top}">
       {{ errorModel }}
    </div>
  `
})

Vue.component('search', {
  props: ['value'],
  computed: {
    searchModel: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  template: `
    <div class="search">
      <form class="goods-search-from" @submit.prevent>
        <input type="text" class="goods-search" v-model.trim="searchModel" />
      </form>
    </div>
  `
});

Vue.component('cart', {
  props: ['goods'],
  data: () => ({
    isVisibleCart: false,
  }),
  methods: {
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
  template: `
    <div class="cart">
      <button class="cart-button" @click="toggleCartVisibility">Корзина</button>
      <transition name="fade">
        <div class="cart-container" v-if="isVisibleCart">
        
        </div>
      </transition>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  methods: {
    add() {
      this.$emit('add', this.good);
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
  computed: {
    isGoodsNotEmpty() {
      return this.goods.length > 0;
    }
  },
  methods: {
    addTo(productId) {
      this.$emit('add', productId)
    }
  },
  template: `
    <div class="goods-list" v-if="isGoodsNotEmpty">
      <goods-item v-for="good in goods" @add="addTo"
          :good="good" :key="good.id_product"></goods-item>
    </div>
    <div class="goods-empty" v-else>
       Нет данных
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    goodsInCart: [],
    errors: [],
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      return this.goods.filter((good) => {
        return regexp.test(good.product_name);
      });
    },
  },
  mounted() {
    this.makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {
      this.goods = goods;
      console.log(goods);
    }).catch(err => this.addError(err));
  },
  methods: {
    addToCart(product) {
      this.makePOSTRequest('/addToCart', product);
    },
    addError(error) {
      this.errors.push(error);
      setTimeout(() => {
        const index = this.errors.indexOf(error);
        if (index > -1) this.errors.splice(index, 1);
      }, 3000);
    },
    makePOSTRequest(url, data) {
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

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        xhr.send(JSON.stringify(data));
      });
    },
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (xhr.status !== 200) reject(response);
              resolve(response);
            } catch (e) {
              reject(e);
            }
          }
        };

        xhr.onerror = function (e) {
          reject(e);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    }
  }
});