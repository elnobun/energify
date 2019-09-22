<template>
    <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                solo
                v-on="on"
                label="Current Date"
                prepend-inner-icon="fas fa-calendar-alt"

            />
        </template>
        <v-date-picker v-model="date" no-title @input="menu1 = false"/>
    </v-menu>
</template>

<script>
  export default {
    name: 'DayField',
    data: (vm) => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,

    }),
  }
</script>

<style scoped>

</style>
