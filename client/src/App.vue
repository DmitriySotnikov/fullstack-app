<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 900px;
  padding: 15px 0;
}

nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;

  &.router-link-exact-active {
    color: #00bbff;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
</style>
