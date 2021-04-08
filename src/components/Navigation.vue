<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom border-secondary">
    <router-link :to="{path: '/'}" tag="a" class="navbar-brand">
      <cld-image publicId="sandkastenliga/favicon" size="30px"/>
    </router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item"
            :class="{active: $route.name === 'matches'}">
          <router-link :to="{name: 'matches'}" tag="a" class="nav-link">
            Spiele
          </router-link>
        </li>
        <li class="nav-item"
            :class="{active: $route.name === 'strenghts'}">
          <router-link :to="{name: 'strenghts'}" tag="a" class="nav-link">
            Stärke-Management
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>