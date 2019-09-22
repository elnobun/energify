<template>
    <v-app-bar app>
        <v-toolbar-title>ENERGIFY
            <v-btn icon to="/"><v-icon class="fad fa-home" /></v-btn>
        </v-toolbar-title>
        
        <v-spacer />

        <p class="mb-0 mr-5">Account Holder: {{ accountName }} </p>
        
        <v-toolbar-items>
            <v-btn text :to="{ name: 'EdfPortal' }">Portal <v-icon class="fad fa-gear" /></v-btn>
        </v-toolbar-items>
        
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
