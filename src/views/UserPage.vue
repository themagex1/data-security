<template>
  <b-container class="content-row" fluid="">
    <b-row class="login-info">
      <b-col cols="9"></b-col>
      <b-col class="column-1">
        <span style="color: white; margin-right: 5px">Zalogowano jako: {{ username }} </span>
        <b-button variant="light" @click="logOut">Wyloguj</b-button>
      </b-col>
    </b-row>
    <b-row class="main-content">
      <b-col class="column-2">
        <h3 class="header" v-if="!check">
          LISTA DOSTĘPNYCH GŁOSOWAŃ
        </h3>
        <h3 v-if="check">
          ZAGŁOSUJ
        </h3>
        <hr class="separator">
        <b-dropdown text="Wybierz z listy" class="m-md-2" v-if="!check">
          <b-dropdown-item v-for="item in info" :key="item.id">
            <div v-for="item2 in item.subForms" :key="item2.id" @click="showForm(item.id)">
              {{ item2.name }}
            </div>
          </b-dropdown-item>
        </b-dropdown>

        <div v-if="check">

          <div v-for="item in info" :key="item.id">
            <div v-if="item.id === id">
              <div v-for="item2 in item.subForms" :key="item2.id" class="questionName">
                {{ item2.name }}
                <div v-for="item3 in item2.options" :key="item3.ident" class="answerName">
                  {{ item3.name }}
                  <input type="checkbox" class="checkboxes" v-model="choices[item2.id]" :id=item3.ident
                         :value=item3.name>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {{ choices }}
        </div>

        <b-button v-if="check" @click="check = false">Cofnij</b-button>
        <b-button v-if="check" @click="vote">Oddaj głos</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { getAuthToken, setAuthToken, setSecret, setPrivateKey, setPublicKey,getSecret } from '@/services/sessionProps'
import axios from 'axios'

let user = localStorage.getItem('user')
export default {
  name: 'UserPage',
  data () {
    return {
      info: '',
      check: false,
      id: 0,
      choices: {},
      username: user

    }
  },
  methods: {
    showForm (id) {

      this.check = true
      this.id = id
      this.choices = {}
      for (let x of this.info) {
        if (x.id == this.id) {
          for (let question of x.subForms) {
            this.choices[question.id] = []
          }
        }
      }
    },

    async vote () {
      let token = getAuthToken()

      console.log(JSON.stringify(this.choices))
      let aesCipher = this.encryptAES(JSON.stringify(this.choices), localStorage.getItem('iv'))
      console.log(aesCipher)
      let objJsonB64 = Buffer.from(aesCipher).toString('base64')
      console.log(objJsonB64)
      const data = { 'formId': this.id, 'voteData': objJsonB64 }
      const headers = {
        'Authorization': 'Bearer ' + token
      }
      await axios.post('https://localhost:5001/api/Form/vote', data, { headers })
      setSecret(null)
      setPublicKey(null)
      setPrivateKey(null)
      setAuthToken(null)
      await this.$router.push({ path: '/' })

    },

    async logOut () {
      let token = getAuthToken()
      const headers = {
        'Authorization': 'Bearer ' + token
      }
      await axios.delete('https://localhost:5001/api/Auth/logout', { headers })
      setSecret(null)
      setPublicKey(null)
      setPrivateKey(null)
      setAuthToken(null)
      localStorage.removeItem('user')
      await this.$router.push({ path: '/' })
      window.location.reload(true);

    },

    encryptAES(message, iv) {

      const encrypt =  this.$CryptoJS.AES.encrypt(message, getSecret(), {iv: iv})
      return encrypt.toString()
    },


  },
  mounted () {
    let token = getAuthToken()
    axios({
      method: 'get', url: 'https://localhost:5001/api/Form',
      headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => (this.info = response.data))

  }
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

.questionName {
  font-size: 3vh;
}

.answerName {
  font-size: 2vh;
}

</style>
