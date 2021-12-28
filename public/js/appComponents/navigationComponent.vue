<template>
  <nav class="center navigation">
    <nav-section
      v-for="(nav, i) of navList"
      :nav="nav"
      :key="i"
      @changeFocus="changeFocus"
    ></nav-section>
  </nav>
</template>

<script>
import navSection from "./nav-section.vue";

export default {
  name: "navigation",
  data() {
    return {
      navList: [
        {
          text: "Все товары",
          type: "",
          focus: true,
        },
        {
          text: "Смартфоны",
          type: "smartphone",
          focus: false,
        },
        {
          text: "Ноутбуки",
          type: "notebook",
          focus: false,
        },
        {
          text: "Мышки",
          type: "mouse",
          focus: false,
        },
        {
          text: "Клавиатуры",
          type: "keyboard",
          focus: false,
        },
        {
          text: "Приставки",
          type: "gameconsol",
          focus: false,
        },
      ],
    };
  },
  methods: {
    changeFocus(navElem) {
      this.navList.forEach((element) => {
        element.focus = false;
      });
      if (navElem != 0 && navElem != 1) {
        navElem.focus = true;
      }
      if(navElem == 1){
        this.navList[0].focus = true;
      }
    },
  },
  components: {
    navSection,
  },
};
</script>

<style>
.navigation {
  display: flex;
  justify-content: space-between;
  background-color: #e6f2f2;
  box-shadow: 0px 5px 14px 1px #d3e0e0;
}
.nav-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 32px;
  /* padding: 15px 35px; */
  font-size: 14px;
  color: #426268;
  font-weight: 400;
  cursor: pointer;
}
/* .nav-section::before {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  position: absolute;
  border-left: 1px solid #ada5a5;
  border-right: 1px solid #ada5a5;
  transform: skew(327deg, 360deg);
} */
.nav-section:hover {
  color: #0b1011;
}
.nav-section:hover::before {
  border-left: 2px solid #ada5a5;
  border-right: 2px solid #ada5a5;
}
.focus-nav {
  color: #0b1011;
  border-bottom: 2px solid #a83294;
}

</style>