<template>
  <div class="product__item">
    <img :src="img" alt="Some img" class="product__item_image" />
    <div class="desc">
      <h3 class="product__name">{{ product.product_name }}</h3>
      <p class="product__price">{{ product.price }}$</p>
      <button class="buy-btn" @click="$emit('add-product', product)">
        Купить
      </button>
    </div>
  </div>
</template>


<script>

export default {
  name: "product",
  props: ["product", "img"]
};

</script>