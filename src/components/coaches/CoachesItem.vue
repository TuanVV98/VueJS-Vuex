<template>
  <div>
    <base-dialog
      :show="deleted == true"
      title="are you sure?"
      @close="handleDeleted"
      @deleted="deletedCoach"
    >
      <p>Are you sure you want Delete Coach {{ fullName }}!</p>
    </base-dialog>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <li>
      <div class="product__data">
        <div class="product__image">
          <img :src="linkImage" :alt="linkImage" />
        </div>
        <div class="product__text">
          <h3>{{ fullName }}</h3>
          <h4>${{ rate }}/hour</h4>
          <div>
            <base-badge :type="areas" :title="areas"></base-badge>
          </div>
        </div>
      </div>
      <div class="actions">
        <button mode="outline" @click="openDialog">Delete</button>
        <base-button link :to="coachContactLink">Edit</base-button>
        <base-button link :to="coachDetailsLink">View Details</base-button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas", "linkImage"],
  data() {
    return {
      deleted: false,
      error: null,
    };
  },
  computed: {
    fullName() {
      // console.log(this.linkImage);
      return this.firstName + " " + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + "/" + this.id + "/edit"; // coaches/c1/contact
    },
    coachDetailsLink() {
      return this.$route.path + "/" + this.id; // coaches/c1
    },
  },
  methods: {
    openDialog() {
      // console.log("true");
      this.deleted = true;
    },
    handleError() {
      this.error = null;
    },
    handleDeleted() {
      this.deleted = false;
    },
    async deletedCoach() {
      this.deleted = false;
      // console.log("true");
      console.log(this.id);
      try {
        const message = await this.$store.dispatch(
          "coaches/deletedCoach",
          this.id
        );
        console.log(message);
      } catch (error) {
        this.error = error.message || "Somthing went wrong !";
      }
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

button {
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  font: inherit;
  background-color: #ff6b6b;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #c92a2a;
  border-color: #270041;
}
div {
  margin: 0.5rem 0;
}
.product__data {
  display: flex;
}

.product__image {
  margin-right: 1rem;
}

.product__image img {
  height: 10rem;
  width: 10rem;
  object-fit: cover;
}

.product__text h3 {
  margin: 0 0 0.5rem 0;
}

.product__text h4 {
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>