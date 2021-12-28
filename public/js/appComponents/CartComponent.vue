<template>
    <div>
        <div class="cart__block" v-show="showCart">
            <div class="cart__container">
                <div v-if="!cartItems.length">В корзине пусто.</div>
                <cart-item
                    v-for="(item, index) of cartItems"
                    :key="index"
                    :img="$root.imgCatalog + item.product_img"
                    :cart-item="item"
                    @remove="remove"
                ></cart-item>
            </div>

            <div class="cart__total" v-if="cartItems.length">Total: {{ totalCart }}$</div>
        </div>
    </div>
</template>

<script>
import cartItem from "./cart-item.vue";
const API = '/db';
export default {
    name: 'cart',
    data() {
        return {
            cartUrl: '/userCart.json',
            cartItems: [],
            showCart: false
        }
    },
     components: {
            cartItem
        },
    mounted() {
        this.$parent.getJson(`${API}${this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    computed: {
        totalCart() {
            let total = 0;
            for (let item of this.cartItems) {
                total += item.price * item.quantity;
            }
            return total;
        }
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$root.putJson(`${API}${this.cartUrl}/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                this.$root.postJson(`${API}${this.cartUrl}`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    })
            }

            this.$root.postJson(`${API}/stats.json`, {
                name: item.product_name,
                move: "add"
            });
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product == item.id_product);
            this.$root.deleteJson(`${API}${this.cartUrl}`, {
                    id: find.id_product
                })
                .then(data => {
                    if (data.result === 1) {
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    }
                });


            this.$parent.postJson(`${API}/stats.json`, {
                name: item.product_name,
                move: "delete"
            });
        }
       
    }
    
};
</script>

<style>
.cart{
    display: flex;
    position: relative;
}
.cart__block{
    z-index: 1;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
    border-radius: 5px;
    box-sizing: border-box;
    right: -3px;
    top: 130%;
    position: absolute;
    background-color: white;
    color: black;
    width: 430px;
    overflow-block: scroll;
}
.cart__container{
    overflow-y: auto;
    max-height: 450px;
    padding: 20px;
}
.cart__block:before{
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    right: 8px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
}
.cart__item {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
}
.cart__item:not(:last-child){
    border-bottom: 1px solid #ebdbdb;
}
.product__bio{
    display: flex;
}
.cart__item img{
    align-self: flex-start;
    margin-right: 15px;
}

.cart__total{
    padding: 30px 20px;
    font-size: 18px;
    color: #fff;
    background-color: #2f2a2d;
}
.product__single_price{
    color: #474747;
    font-size: 0.5em;
}
.product__price_cart{
    margin-top: 20px;
    font-size: 18px;
}
.product__title{
    font-size: 18px;
}
.product__desc{
    max-width: 150px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 10px;
    border-left: 1px solid #ebdbdb;
}
.product__quantity {
    margin-top: 8px;
    font-size: 0.75em;
}
.cart__item_right{
    text-align: right;
    display: flex;
    align-items: center;
}
.cart__item_image{
    height: 100px;
    width: 100px;
}

@media (max-width: 767px){
    .cart-block{
        width: 300px;
    }
}

</style>
