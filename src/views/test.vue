<template>
  <div class="">
      <div v-for="item in info" :key="item.id">
          <div v-for="item2 in item.subForms" :key="item2.id">
              <div v-for="item3 in item2.options" :key="item3.ident">
                {{ item3.name }}
              </div>
          </div>
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
