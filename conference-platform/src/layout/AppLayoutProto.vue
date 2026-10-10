<script setup lang="ts">

//führt nirgends hin
const navItems = [
  { label: 'Programm', href: '#', active: true },
  { label: 'Speaker', href: '#' },
  { label: 'Mein Programm', href: '#' }
]
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="container header-inner">
        <a href="#" class="logo">ConFlare Lo<span class="logo-flare">go</span></a>
        <nav aria-label="Hauptnavigation">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.label">
              <a
                :href="item.href"
                class="nav-link"
                :aria-current="item.active ? 'page' : undefined"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container main">
      <slot />
    </main>

    <footer class="footer">
      <div class="container">Lisa Hoffmann, Doris Hochenauer - Webfrontend</div>
    </footer>
  </div>
</template>

