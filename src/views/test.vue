<template>
  <div class="">
    <!--


    <div v-for="item in info" :key="item.id">

    </div>
    -->
    <div>
      {{info}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getAuthToken } from '@/services/sessionProps'

export default {
  name: 'test',
  data () {
    return {
      info: '',
      check: false,
      id: 0,
    }
  },
  methods: {
    showForm (id) {
      this.check = true
      this.id = id

    }
  },
  mounted () {
    let token = getAuthToken()
    axios({ method: 'get', url: 'https://localhost:5001/api/Form', headers: { Authorization: `Bearer ${token}` } })
        .then(response => (this.info = response.data))
    //this.info.filter()


  }
}
</script>

<style scoped>

</style>
