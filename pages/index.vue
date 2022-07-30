<template>
  <div>
    <header class='nav-container' @scroll="handleScroll">
      <NavBar />
    </header>
    <main class="container">
      <Content />
    </main>
    <div class="footer-container">
      <img class='planet' src='@/assets/src/pic/planet.png' />
      <div class="inner-container">
        <NavBar />
        <div class="under-footer">
          <a href="#">
            <p class="blue-text">Multisender Addresses
              <img class="info" src="@/assets/src/icons/info.svg" />
            </p>
          </a>
          <Social />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import Content from "@/components/Content.vue";
export default {
  components: {
    NavBar,
    Content
  },
  data() {
    return {
      letsScroll: false
    }
  },
  methods: {
    handleScroll() {
      let header = document.querySelector(".nav-container");
      if (window.scrollY > 1) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang='scss'>
.nav-container {
  position: sticky;
  z-index: 100;
  top: 0;
  padding: 33px 120px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(39, 56, 119, 0);
  transition: all .3s;
}

.scrolled {
  background-color: #0b114c;
  border-bottom-color: #273877;
  transition: all .3s;
}

.container {
  margin: 0 auto;
  padding: 210px 120px 0;
  max-width: 1200px;
}

.under-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;

  a {
    opacity: 1;
    transition: all .3s;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
      transition: all .3s;
    }
  }

  .blue-text {
    display: flex;
  }

  .info {
    padding-left: 5px;
  }
}

.footer-container {
  position: relative;
  padding-top: 500px;
  max-width: 1440px;
  margin: 0 auto;

  .inner-container {
    max-width: 1200px;
    margin: inherit;
    z-index: 9999;
  }

  .planet {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
}
</style>