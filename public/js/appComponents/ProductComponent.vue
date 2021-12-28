<template>
  <div class="products">
    <product
      v-for="item of filtered"
      :key="item.id_product"
      :img="$root.imgCatalog + item.product_img"
      :product="item"
      @add-product="$parent.$refs.cart.addProduct"
    ></product>
  </div>
</template>

<script>
import product from "./product.vue";
const API = "/db";
export default {
  name: "products",
  data() {
    return {
      catalogUrl: "/products.json",
      filtered: [],
      products: [],
    };
  },
  mounted() {
    this.$parent.getJson(`${API}${this.catalogUrl}`).then((data) => {
      for (let item of data) {
        this.$data.products.push(item);
        this.$data.filtered.push(item);
      }
    });
  },
  methods: {
    filter(userSearch, type = "") {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
    //фильтрация по навигационному каталогу
    filterNavigation(type) {
      if (type != "") {
        this.filtered = this.products.filter((el) => {
          return el.type == type;
        });
      }else this.filtered = this.products;
    },
  },
  components: {
    product,
  },
};
</script>

<style>
.products{
    column-gap: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: 1fr;
    /* padding: 40px 80px; */
    justify-content: center;
    padding: 60px 0;
}

.product__item{
    display: flex;
    flex-direction: column;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px 0;
    border: 1px solid #c0c0c040;
}

.product__name{
    height: 45px;
    margin: 10px 0 10px 0;
}
.product__item_image{
    width: 200px;
    height: 200px;
}
.desc {
    padding: 15px;
    color: #fff;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
    background-color: #a83294;
}
</style>

