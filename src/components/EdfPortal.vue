<template>
    <div>
        <app-toolbar></app-toolbar>

        <v-container>

            <v-row>
                <!-- FIRST COLUMN -->
                <v-col cols="7">
                    <v-card>
                        <v-card-title>EDF Calculator</v-card-title>

                        <v-divider/>

                        <v-card-text class="blue">

                            <!-- Calculate DAY RATE -->
                            <p class="white--text subtitle-1">Day (R2):</p>
                            <p class="white--text subtitle-1">Your last reading was: <strong>{{ dayReading }}</strong>
                            </p>
                            <v-row dense>
                                <v-col cols="4">
                                    <v-text-field
                                        solo
                                        type="number"
                                        label="previous reading"
                                        v-model="day.previousReading"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        solo
                                        type="number"
                                        label="current reading"
                                        v-model="day.currentReading"
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-btn
                                        @click="calcDay"
                                        v-if="day.previousReading.length === 5 && day.currentReading.length === 5"
                                        color="success">Charge
                                    </v-btn>
                                </v-col>

                            </v-row>

                            <!-- Calculate NIGHT RATE -->
                            <p class="mb-0 white--text subtitle-1">Night (R1):</p>
                            <p class="white--text subtitle-1">Your last reading was: <strong>{{ nightReading }}</strong>
                            </p>
                            <v-row dense>
                                <v-col cols="4">
                                    <v-text-field
                                        solo
                                        type="number"
                                        label="previous reading"
                                        v-model="night.previousReading"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        solo
                                        type="number"
                                        label="current reading"
                                        v-model="night.currentReading"
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-btn
                                        @click="calcNight"
                                        v-show="night.previousReading.length === 5 && night.currentReading.length === 5"
                                        color="success">Charge
                                    </v-btn>
                                </v-col>

                            </v-row>

                            <!--Select Date -->
                            <p class="white--text subtitle-1">Select Period:</p>
                            <v-row dense>
                                <v-col cols="4">
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                solo
                                                v-on="on"
                                                :value="month.current"
                                                label="Current Date"
                                                prepend-inner-icon="fas fa-calendar-alt"

                                            />
                                        </template>
                                        <v-date-picker v-model="month.current" no-title @input="menu1 = false"/>
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                    <v-menu>
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                solo
                                                :value="month.previous"
                                                v-on="on"
                                                label="Previous Date"
                                                prepend-inner-icon="fas fa-calendar-alt"
                                                transition="scale-transition"
                                            />
                                        </template>
                                        <v-date-picker v-model="month.previous"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn
                                        @click="calcStandingCharge"
                                        v-show="month.current && month.previous"
                                        class="success">Get days
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- SECOND COLUMN -->
                <v-col cols="5">
                    <v-row>
                        <v-col col="12" class="pt-0">
                            <!-- Get Rate for Night and Day -->
                            <v-card class="mb-2">
                                <v-card-title>RATE:</v-card-title>

                                <v-divider/>

                                <v-card-text class="grey lighten-4 subtitle-1">
                                    <p>Day Rate = £{{ dayOutput }} </p>
                                    <p>Night Rate = £{{ nightOutput }} </p>
                                    <p>Standing charge
                                        <span v-if="month.current && month.previous">
                                                ({{ days }} days @ 26.94p per day)
                                            </span> =
                                        £{{ standingChargeOutput }}
                                    </p>
                                    <v-btn
                                        :disabled="!!electricityTotal"
                                        small color="error"
                                        @click="calElectricityCharge"
                                        v-if="dayOutput && nightOutput && standingCharge"
                                    >Get Rate
                                    </v-btn>
                                </v-card-text>
                            </v-card>

                            <!-- EDF Electrical Charge -->
                            <v-card>
                                <v-card-title>EDF Electricity Charge</v-card-title>

                                <v-divider/>

                                <v-card-text class="grey lighten-4 subtitle-1">
                                    <div>
                                        <p>Rate: £{{ calElectricity }} </p>
                                        <p>VAT@ 5% of {{calElectricity}} = £{{ calcVAT }}</p>
                                    </div>
                                    <v-btn
                                        small
                                        :disabled="!!sumTotal"
                                        color="error"
                                        @click="calTotal"
                                        v-show="electricityTotal">Calculate Total
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <h2><strong>Amount Due:</strong> £{{ total }}</h2>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
  import moment from 'moment'
  import AppToolbar from '@/components/AppHeader/AppToolbar'

  export default {
    name: 'EdfPortal',
    components: { AppToolbar },
    data: () => ({
      disable: false,
      menu1: false,
      menu2: false,
      month: {
        current:new Date().toISOString().substr(0, 10),
        previous: '',
      },
      day: {
        previousReading: '',
        currentReading: '',
        rate: 21.28,
        reading: 0,
      },
      night: {
        previousReading: '',
        currentReading: '',
        rate: 11.60,
        reading: 0,
      },
      VAT: 0,
      standingCharge: 0,

      electricityTotal: 0,
      sumTotal: 0,
    }),

    mounted () {
      const day = this.dayReading
      const night = this.nightReading
      this.day.previousReading = day
      this.night.previousReading = night
    },

    computed: {
      dayOutput () {
        return this.day.reading
      },

      dayReading () {
        return localStorage.getItem('dayReading')
      },

      nightOutput () {
        return this.night.reading
      },

      nightReading () {
        return localStorage.getItem('nightReading')
      },

      standingChargeOutput () {
        return this.standingCharge.toFixed(2)
      },

      calcVAT () {
        const VAT = this.electricityTotal * (5 / 100)
        return VAT.toFixed(2)
      },

      calElectricity () {
        return this.electricityTotal.toFixed(2)
      },

      total () {
        return this.sumTotal.toFixed(2)
      },

      days () {
        let day = 0
        let date = moment(this.month.current).diff(this.month.previous, 'days')
        return day + date
      },

    },

    methods: {
      calcDay () {
        let dayCharge = (this.day.currentReading - this.day.previousReading) * (this.day.rate / 100)
        this.day.reading = parseFloat(dayCharge.toFixed(2))
        localStorage.setItem('dayReading', this.day.currentReading)
        return dayCharge

      },

      calcNight () {
        let nightCharge = (this.night.currentReading - this.night.previousReading) * (this.night.rate / 100)
        this.night.reading = parseFloat(nightCharge.toFixed(2))
        localStorage.setItem('nightReading', this.night.currentReading)
        return nightCharge
      },

      calcStandingCharge () {
        const date = moment(this.month.current).diff(this.month.previous, 'days')
        const result = date * 0.2694
        this.standingCharge = result
        this.disable = true
        return result
      },

      calElectricityCharge () {
        this.electricityTotal = this.electricityTotal + this.day.reading + this.night.reading + this.standingCharge
      },

      calTotal () {
        const vat = this.electricityTotal * (5 / 100)
        const result = this.electricityTotal + vat
        this.sumTotal = this.sumTotal + result
        return result
      },
    },
  }
</script>

<style scoped>

</style>
