<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/home" class="navbar-brand">Our Nightlife</router-link>
      </div>
      <ul class="nav navbar-nav pull-right">
        <template v-if="isAuthenticated">
          <li>
            <a @click.prevent.stop="logout">Logout</a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/register">Register</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
  import router from '../../utilities/router'
  import store from '../../utilities/store'
  import { mapGetters } from 'vuex'

  export default {
    name: "header-comp",
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      logout () {
        store.commit('removeAuthentication')
        router.push('home')
      }
    }
  }
</script>

<style>
  .navbar {
    border-radius: 0;
  }

  .navbar-brand {
    font-weight: bold;
  }
</style>

