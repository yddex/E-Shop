<template>
  <form
    action="#"
    class="search__form"
    @submit.prevent="$root.$refs.products.filter(userSearch);
     if(userSearch)$root.$refs.nav.changeFocus(0);
     else $root.$refs.nav.changeFocus(1)" >
    <input type="text" class="search__field" v-model="userSearch" placeholder="Ноутбук"/>
    <button type="submit" class="btn-search">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>


<script>
export default {
  name: "filter-el",
  data() {
    return {
      userSearch: "",
    };
  }
};
</script>

<style>
.btn-search {
    background-color: transparent;
    border: none;
    color: #fafafa;
    font-size: 1.2em;
    position: absolute;
    bottom: 5px;
    right: 0;
}
.search__form{
    position: relative;
    margin-left: 50px;
    display: inline-block;
}
.search__field:focus{
    outline: none;
}
.search__field::placeholder{
    color:rgba(255, 255, 255, 0.363);
}
.search__field:focus::placeholder{
    color: transparent;
}
.search__field {
    box-sizing: border-box;
    max-width: 300px;
    color: #fafafa;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fafafa;
  }
  @media (max-width: 767px){
    .search__field{
       max-width: 150px;
    }
  }
</style>