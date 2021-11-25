<template>
  <div>
    <section>
      <base-card>
        <h2>{{ id ? "Edit  as a coach now!" : "Register as a coach now!" }}</h2>
        <coach-form @save-data="saveData" :id="id"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
  props: ["id"],
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      if (!data.id) {
        this.$store.dispatch("coaches/registerCoach", data);
        this.$router.replace("/coaches");
      }else if(data.id){
        this.$store.dispatch("coaches/updateCoach", data);
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>