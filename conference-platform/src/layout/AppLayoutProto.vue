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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-medium);
}

.header {
  background: var(--color-brand-primary);
  color: var(--color-text-on-brand);
  border-bottom: 4px solid var(--color-brand-accent);
}

.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-small);
  padding-top: var(--space-medium);
  padding-bottom: var(--space-medium);
}

.logo {
  color: var(--color-text-on-brand);
  font-size: var(--font-size-heading-2);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}
.logo-flare {
  color: var(--color-brand-accent);
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-small);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  display: block;
  padding: var(--space-xsmall) var(--space-small);
  border-bottom: 2px solid transparent;
  border-radius: 4px 4px 0 0;
  color: var(--color-text-on-brand);
  text-decoration: none;
}

.nav-link:hover,
.nav-link:focus-visible {
  background: var(--color-brand-primary-hover);
}

.nav-link[aria-current="page"] {
  border-bottom-color: var(--color-brand-accent);
}

.main {
  flex: 1;
  padding-top: var(--space-large);
  padding-bottom: var(--space-large);
}

.footer {
  padding: var(--space-medium) 0;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}
</style>
