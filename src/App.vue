<template>
    <v-app>

        <v-content>
            <router-view></router-view>
        </v-content>

        <app-footer></app-footer>
    </v-app>
</template>

<script>
  import AppFooter from '@/components/AppFooter/AppFooter'

  export default {
    name: 'app',
    components: {
      AppFooter,
    },
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
