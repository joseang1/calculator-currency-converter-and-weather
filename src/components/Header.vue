<script setup>

  import { Offcanvas, Collapse } from 'bootstrap'

  function closeMobileMenu() {
    const el = document.getElementById('navMenuMobile')
    const instance = Collapse.getInstance(el)
    instance?.hide()
  }

  function closeOffcanvas() {
    const el = document.getElementById('sidebarMenu')
    const instance = Offcanvas.getInstance(el)
    instance?.hide()
  }

</script>

<template>
  <nav class="navbar sticky-top bg-body-tertiary shadow-sm">
    <div class="container-fluid position-relative">

      <div class="d-md-none d-flex justify-content-center w-100">
        <button
          class="navbar-toggler custom-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenuMobile"
          aria-controls="navMenuMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar3"></span>
        </button>
      </div>

      <div class="d-none d-md-flex align-items-center w-100">
        <button
          class="navbar-toggler custom-toggler collapsed"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-label="Toggle navigation"
        >
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar3"></span>
        </button>

        <RouterLink class="navbar-brand mb-0 ms-3" to="/">Calculator</RouterLink>
      </div>

    </div>
  </nav>

  <div class="collapse d-md-none" id="navMenuMobile">
    <ul class="nav flex-column text-center bg-body-tertiary border-top">
      <li class="nav-item">
        <RouterLink class="nav-link py-3" to="/" @click="closeMobileMenu">
          Calculator
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link py-3" to="/weather" @click="closeMobileMenu">
          Weather
        </RouterLink>
      </li>
    </ul>
  </div>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="sidebarMenu"
    aria-labelledby="sidebarMenuLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="sidebarMenuLabel">Menu</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/" @click="closeOffcanvas" data-testid="offcanvas-nav-calculator">Calculator</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/weather" @click="closeOffcanvas" data-testid="offcanvas-nav-weather">Weather</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.custom-toggler {
  border: none;
  background: none;
  padding: 0.5rem;
  width: 30px;
  height: 24px;
  position: relative;
}

.bar {
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease, top 0.3s ease;
}

.bar1 { top: 0; }
.bar2 { top: 10px; }
.bar3 { top: 20px; }

.custom-toggler:not(.collapsed) .bar1 {
  top: 10px;
  transform: rotate(45deg);
}

.custom-toggler:not(.collapsed) .bar2 {
  opacity: 0;
}

.custom-toggler:not(.collapsed) .bar3 {
  top: 10px;
  transform: rotate(-45deg);
}
</style>