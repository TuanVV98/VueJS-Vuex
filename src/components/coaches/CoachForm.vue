<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="coach.firstName" />
      <!-- <p v-if="!firstName.isValid">Firstname must not be empty.</p> -->
    </div>
    <div class="form-control">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="coach.lastName" />
      <!-- <p v-if="!lastName.isValid">Lastname must not be empty.</p> -->
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="coach.description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="linkImage">LinkImage</label>
      <input type="text" id="linkImage" v-model.trim="coach.linkImage" />
      <!-- <p v-if="!linkImage.isValid">Lastname must not be empty.</p> -->
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="coach.hourlyRate" />
    </div>  
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="radio" id="frontend" value="frontend" v-model="coach.areas"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="radio" id="backend" value="backend" v-model="coach.areas"/>
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="radio" id="career" value="career" v-model="coach.areas" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <!-- <p v-if="!formIsValid">Please fix the above errors and submit again.</p> -->
    <base-button>{{ this.id ? "Update" : "Register" }}</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  props: ["id"],
  data() {
    return {
      coach: {
        id: "",
        firstName: "",
        lastName: "",
        description: "",
        hourlyRate: "",
        areas: "",
        linkImage: "",
      },
      // formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      if (!this.id) {
        this.$emit("save-data", this.coach);
      } else if (this.id) {
        this.$emit("save-data", this.coach);
      }
    },
    findCoachById() {
      if (this.id) {
        const coach = this.$store.getters["coaches/coaches"].find(
          (coach) => coach.id == this.id
        );
        //https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649__340.jpg
        this.coach = coach;
        // console.log(coach);
        // console.log(this.coach);
      }
      return false;
    },
  },
  created() {
    this.findCoachById();
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="radio"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="radio"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="radio"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>