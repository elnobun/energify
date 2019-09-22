<template>
    <v-app-bar app>
        <v-toolbar-title>ENERGIFY
            <v-btn icon to="/"><v-icon class="fad fa-home" /></v-btn>
        </v-toolbar-title>
        
        <v-spacer />

        <p class="mb-0 mr-5">Account Holder: {{ accountName }} </p>
        
    </v-app-bar>
</template>

<script>
  export default {
    name: 'AppToolbar',
    data() {
      return {
        accountName: ''
      }
    },
    computed: {
      setName() {
        return localStorage.getItem('accountName')
      }
    },
    
    mounted() {
      this.accountName = this.setName
    }
  }
</script>

<style scoped>

</style>
