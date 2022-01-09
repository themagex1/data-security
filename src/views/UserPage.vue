<template>
  <b-container class="content-row" fluid="">
    <b-row class="login-info">
      <b-col cols="9"></b-col>
      <b-col class="column-1">
        <span style="color: white">Zalogowano jako: rosiakd6@gmail.com </span>
        <b-button variant="light">Wyloguj</b-button>
      </b-col>
    </b-row>
    <b-row class="main-content">
      <b-col class="column-2">
        <h3 class="header">
          LISTA DOSTĘPNYCH GŁOSOWAŃ
        </h3>

        <hr class="separator">
        <b-dropdown text="Wybierz z listy" class="m-md-2">
          <b-dropdown-item >Głosowanie na Przewodniczącego WSRH</b-dropdown-item>
          <b-dropdown-item>Głosowanie na najlepszy język programowania</b-dropdown-item>
        </b-dropdown>

        <b-list-group>

        </b-list-group>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  name: 'UserPage'
}
</script>

<style scoped>
.content-row {
  background-image: url("../assets/tlo.jpg");
  min-width: 100%;
  min-height: 100%;
  position: fixed;
}
.main-content {
  max-width: 50%;
  min-height: 25vh;
  margin: 15% auto;
  background: white;
}

.separator {
  border: 0;
  border-top: 1px solid #CCC;
}
.column-2 {
  margin-top: 3vh;

}
</style>
