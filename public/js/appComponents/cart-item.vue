
<template>
  <div class="cart__item">
    <div class="product__bio">
      <img :src="img" alt="Some img" class="cart__item_image" />
      <div class="product__desc">
        <div class="product__title">{{ cartItem.product_name }}</div>
        <div class="product__quantity">Quantity: {{ cartItem.quantity }}</div>
        <div class="product__single_price">$ {{ cartItem.price }} each</div>
        <div class="product__price_cart">
          {{ cartItem.quantity * cartItem.price }}$
        </div>
      </div>
    </div>
    <div class="cart__item_right">
      <button class="del-btn" @click="$emit('remove', cartItem)">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart-item",
  props: ["img", "cartItem"],
};
</script>