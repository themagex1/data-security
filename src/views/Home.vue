<template>
  <div class="container">
    <div class="row">
      <div class="col center-window">
        <h2 class="header"> Witamy w systemie elektronicznego głosowania</h2>
        <hr class="separator">
        <p class="description">
          System elektronicznego głosowania gwarantuje:
        </p>
        <ul class="list">
          <li class="list-element">
            Akceptowalny udział w głosowaniu bez potrzeby wychodzenia z domu
          </li>
          <li class="list-element">
            Bezpieczne i anonimowe oddawanie głosów
          </li>
          <li class="list-element">
            Brak obaw, że głosowanie będzie sfałszowane
          </li>
        </ul>
        <hr class="separator">
        <p class="description">
          Aby oddać swój głos, zaloguj się bezpiecznie naciskając przycisk poniżej
        </p>
        <div class="google-btn" @click="signInWithGoogle">
          <div class="google-icon-wrapper">
            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
          </div>
          <p class="btn-text"><b>Sign in with Google</b></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import FetchHelper from '@/helpers/fetchHelper'
import {setAuthToken, setLoggedInEmail} from '@/services/sessionProps'

export default {
  name: 'Home',
  components: {},
  methods: {
    async signInWithGoogle () {
      try {
        const fetchHelper = new FetchHelper();
        const googleUser = await this.$gAuth.signIn();
        let idToken = googleUser.getAuthResponse().id_token;
        //let PublicKey = ...
        const response = await fetch(
            "https://localhost:5001/api/Auth/google-request",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken,
                //wtf coś PublicKey
              }),
            }
        )
            .then(fetchHelper.handleErrors)
            .then((res) => res.json());
        localStorage.setItem("bearer", response.accessToken);
        setAuthToken(response.access_token);
        console.log(googleUser);
        setLoggedInEmail(googleUser.Email);
        await this.$router.push({
          name: "HomePage",
        });
        console.log(googleUser);
      } catch (e) {
        setAuthToken(null);
        setLoggedInEmail(null);
      }
    }
  }
}
</script>
<style scoped>
.container {
  background-image: url("../assets/tlo.jpg");
  min-width: 100%;
  min-height: 100%;
  position: fixed;
}

.center-window {
  max-width: 40%;
  height: 45%;
  background: white;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  position: absolute;
  border-radius: 20px;
  font-size: 1.5vh;

}

.header {
  max-width: 40%;
  text-align: center;
  margin: 20px auto;
  font-size: 3.2vh;
}

.separator {
  border: 0;
  border-top: 1px solid #CCC;
}

.list-element {
  max-width: 70%;
  margin: 0 auto;
}

.google-btn {
  width: 25%;
  height: 9.5%;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .25);
  cursor: pointer;
  margin: auto;
}

.google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 1px;
  width: 5.5%;
  height: 9%;
  border-radius: 2px;
  background-color: white;
}

.google-icon {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 50%;
  height: 50%;
}

.btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: white;
  font-size: 1.4vh;
  font-family: "Roboto";
}

.google-btn:hover {
  box-shadow: 0 0 6px #4285f4;
}

.google-btn:active {
  background: #1669F2;
}

</style>
