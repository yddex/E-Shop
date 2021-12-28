//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = '/db';

import errorComponent from "./appComponents/ErrorComp.vue";
import filterComponent from "./appComponents/FilterComp.vue";
import productsComponent from "./appComponents/ProductComponent.vue";
import CartComponent from "./appComponents/CartComponent.vue";
import navigation from "./appComponents/navigationComponent.vue";

//const app=
new Vue({
    el: '#app',
    data: {
        imgCatalog: 'img/',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        deleteJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },


    },
    components: {
        'cart': CartComponent,
        'error': errorComponent,
        'filter-el': filterComponent,
        'products': productsComponent,
        'navigation': navigation
    }

});