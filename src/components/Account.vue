<template>
    <v-container class="fill-height">
        <v-row class="justify-center">
            <v-col
                cols="12"
                md="4"
                class="text-center"
                v-if="submitted === false && !flashMessage"
            >
                <h2 class="mb-2">Welcome to EDF Electricity Account Manager</h2>
                <p>Please enter account name to proceed</p>
                <v-text-field solo label="Enter name" v-model="name" />
                <v-btn color="primary" @click="setName">Submit </v-btn>
            </v-col>
            <v-col
                cols="12"
                md="4"
                class="text-center"
                v-if="submitted === true && !flashMessage"
            >
                <h2 class="mb-2">Thanks</h2>
                <p>Please procced to account</p>
                <v-btn v-if="name" color="primary" :to="{ name: 'EdfPortal' }"
                    >Proceed
                </v-btn>
            </v-col>

            <v-col cols="12" md="4" class="text-center" v-if="flashMessage">
                <h2 class="mb-2">{{ flashMessage }}</h2>
                <v-btn v-if="name" color="primary" :to="{ name: 'EdfPortal' }"
                    >Proceed
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Account",
    data() {
        return {
            name: "",
            flashMessage: "",
            submitted: false
        };
    },

    methods: {
        setName() {
            if (this.name) {
                this.submitted = true;
                localStorage.setItem("accountName", this.name);
            }
            // const getName = localStorage.getItem("accountName");
            // console.log(getName);
            // if (getName === this.name) {
            //     this.submitted = false;
            //     this.flashMessage =
            //         "Account name already exist. Please proceed";
            // }
        },

        getName() {}
    },
    
    mounted() {
      const getName = localStorage.getItem("accountName")
      this.name = getName;
      if(getName) {
        this.$router.push('/portal')
      } else {
        this.$router.push('/')
      }
    }
};
</script>

<style scoped>
input,
button {
    padding: 1rem;
    margin-right: 1rem;
}
</style>
