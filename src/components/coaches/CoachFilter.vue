<template>
  <base-card>
    <div>
      <h2>
        Find Your Coach
        <font-awesome-icon
          icon="magnifying-glass"
          class="icon"
          @click="openDialog"
        /> 
      </h2>
    </div>
    <div>
      <span class="filter-option">
        <input type="checkbox" id="frontend" checked @change="setFilters" />
        <label for="frontend"> Frontend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="backend" checked @change="setFilters" />
        <label for="backend"> Backend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="career" checked @change="setFilters" />
        <label for="career"> Career</label>
      </span>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter", "search-input"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;

      // console.log("input : ", inputId + " is active : " + isActive);
      const updateFilter = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updateFilter;
      this.$emit("change-filter", updateFilter);
    },
    openDialog() {
      this.$emit("search-input");
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.icon {
  width: 20px !important;
  height: 20px;
  margin-left: 25rem;
  cursor: pointer;
}
.icon:hover {
  width: 20px !important;
  height: 20px;
  color: #fa5252;
}

.filter-option.active label {
  font-weight: bold;
}
</style>