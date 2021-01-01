<template>
  <div class="app" id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="app__header">
      <h2 class="app__title">
        #movienow
      </h2>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss"></style>
