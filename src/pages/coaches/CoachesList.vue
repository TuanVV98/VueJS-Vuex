<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog-search
      :show="search == true"
      title="Search By Name!"
      @close="handleSearch"
      @text-input="getValue"
    ></base-dialog-search>

    <section>
      <coach-filter @change-filter="setFilters" @search-input="openInputSearch">
      </coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <button mode="outline" @click="loadCoaches(true)">Refresh</button>
          <base-button link to="/register">Register a Coach</base-button>
        </div>
        <div v-if="isLoading === true">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coaches-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            :linkImage="coach.linkImage"
          ></coaches-item>
          <!-- <li v-for="coach in filteredCoaches" :key="coach.id">

          {{coach.firstName}}
        </li> -->
        </ul>
        <h3 v-else>No Coaches Found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachesItem from "../../components/coaches/CoachesItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachesItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      search: false,
      textInput: "",
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];

      const areasCoaches = coaches.filter((coach) => {
        // console.log("chay vo");
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
      if (this.textInput == "") {
        return areasCoaches;
      }

      return areasCoaches.filter((coach) =>
        coach.firstName.toLowerCase().startsWith(this.textInput) || coach.lastName.toLowerCase().startsWith(this.textInput)
      );
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
    setFilters(updateFilter) {
      this.activeFilters = updateFilter;
    },
    loadCoaches(refresh = false) {
      this.textInput = "";
      console.log("true");
      this.isLoading = true;
      setTimeout(() => this.loadSprinner(refresh), 2000);
    },
    async loadSprinner(refresh) {
      try {
        var t0 = performance.now();
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
        var t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || "Somthing went wrong !";
      }
    },
    handleError() {
      this.error = null;
    },
    handleSearch() {
      this.search = false;
    },
    openInputSearch() {
      this.search = true;
    },
    getValue(value) {
      // console.log(value);
      this.textInput = value;
      // this.search = false;
    },
  },
  created() {
    this.loadCoaches();
  },
  // mounted() {
  //   this.getData();
  // },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  font: inherit;
  background-color: #8ce99a;
  border: 1px solid #3a0061;
  color: #3a0061;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #37b24d;
  border-color: #270041;
  color: white;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>