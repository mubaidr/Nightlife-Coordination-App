<template>
  <div>
    <div class="jumbotron text-center">
      <h1>Nightlife Coordination</h1>
      <div style="font-size: 5em;">
        <i class="fa fa-map-marker" style="margin-top: 20px; margin-right: 10px"></i>
        <i class="fa fa-cab"></i>
        <i class="fa fa-glass"></i>
      </div>
      <p>Search bars and let others know where you are going tonight.</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text" class="form-control" placeholder="Location" v-model="location">
          </div>
          <div class="col-lg-2">
            <button class="btn btn-primary btn-block" @click="search" :disabled="!location.length > 0">Go</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <ul class="list-group" v-if="bars.length>0">
            <li class="list-group-item" v-for="bar in bars" :key="bar._id">
              <button type="button" @click="iAmGoing(bar._id)">
                <span class="badge" title="Total Votes">{{bar.going.length}}</span>
                {{bar.title}}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../utilities/router'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        bars: [],
        location: ''
      }
    },
    computed: {
      ...mapGetters(['getAPI', 'isAuthenticated'])
    },
    methods: {
      iAmGoing (id) {
        if (this.isAuthenticated) {
          axios.post(this.getAPI.url + 'api/bars', { id: id }).then(res => {
            this.bars = res.data
          }).catch(() => {
            alert('Error! Please try again.')
          })
        } else {
          router.push('/login')
        }
      },
      search () {
        axios.get(this.getAPI.url + 'api/bars', { location: this.location }).then(res => {
          this.bars = res.data
        }).catch(() => {
          console.log('Error! Please try again.')
        })
      }
    },
    mounted () {
      this.search()
    }
  }
</script>

<style>

</style>

