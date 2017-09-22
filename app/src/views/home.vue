<template>
  <div>
    <div class="jumbotron text-center">
      <h1>Nightlife Coordination</h1>
      <div style="font-size: 5em;">
        <i class="fa fa-map-marker" style="margin-top: 20px; margin-right: 10px"></i>
        <i class="fa fa-cab"></i>
        <i class="fa fa-glass"></i>
      </div>
      <p>Find bars and let others know where you are going tonight!</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="form-group">
          <div class="col-lg-12">
            <input type="text" class="form-control" placeholder="Filter by Location, Name. e.g. London, Hotel leeds, React" v-model="location">
          </div>
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col-lg-12">
          <ul class="list-group" v-if="getBars.length>0">
            <li class="list-group-item hotel" v-for="bar in getBars" :key="bar._id">
              {{bar.title}}
              <span class="text-muted">({{bar.location}})</span>
              <span class="badge" title="Total Votes">
                &nbsp; Total:
                <em>{{bar.going.length}}</em>
              </span>
              <span class="badge" :class="{'active': iAmGoing(bar._id)}" @click="iWillGo(bar._id)">
                <em>{{iAmGoing(bar._id) ? 'You are going': 'I wanna Go'}}</em>
              </span>
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
      ...mapGetters(['getAPI', 'isAuthenticated', 'getUser']),
      getBars () {
        var _self = this

        return this.location ? this.bars.filter(function (bar) {
          return bar.location.toLowerCase().indexOf(_self.location.toLowerCase()) > -1 || bar.title.toLowerCase().indexOf(_self.location.toLowerCase()) > -1
        }) : this.bars
      }
    },
    methods: {
      iAmGoing (id) {
        var bar = this.findBarById(id)
        return bar.going.indexOf(this.getUser.data._id) > -1
      },
      iWillGo (id) {
        if (this.isAuthenticated) {
          if (this.iAmGoing(id)) {
            axios.post(this.getAPI.url + 'api/bars', { id: id, add: false }).then(res => {
              this.bars = res.data
            }).catch((err) => {
              alert('Error! Please try again.', err)
            })
            return
          }

          axios.post(this.getAPI.url + 'api/bars', { id: id, add: true }).then(res => {
            this.bars = res.data
          }).catch((err) => {
            alert('Error! Please try again.', err)
          })
        } else {
          router.push('/login')
        }
      },
      loadBars () {
        axios.get(this.getAPI.url + 'api/bars').then(res => {
          this.bars = res.data
        }).catch((err) => {
          console.log('Error! Please try again.', err)
        })
      },
      findBarById (id) {
        return this.bars.filter(function (bar) {
          return bar._id === id
        })[0]
      }
    },
    mounted () {
      this.loadBars()
    }
  }
</script>

<style>
  .hotel .badge {
    cursor: pointer;
  }

  .hotel .badge.active {
    background-color: #76818d;
  }
</style>

