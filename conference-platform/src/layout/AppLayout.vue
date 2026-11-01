<script setup lang="ts">
// Speaker und Mein Programm folgen in späteren Schritten, bis dahin NotFoundView
const navItems = [
  { label: 'Programm', to: '/' },
  { label: 'Speaker', to: '/speakers' },
  { label: 'Mein Programm', to: '/mein-programm' }
]
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="container header-inner">
        <RouterLink to="/" class="logo">ConFlare Lo<span class="logo-flare">go</span></RouterLink>
        <nav aria-label="Hauptnavigation">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.label">
              <!-- RouterLink setzt aria-current="page" auf der aktiven Seite -->
              <RouterLink :to="item.to" class="nav-link">
                {{ item.label }}
              </RouterLink>
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
