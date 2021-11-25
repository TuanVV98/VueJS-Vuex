<template>
  <div to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <!-- <h2>{{ title }}</h2> -->
            <div className="input-wrapper">
              <input
                v-model.lazy="text"
                placeholder="Search..."
                spellCheck="{false}"
                v-on:input="signalChange"
              />
              <span className="input-highlight"> </span>
            </div>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <button @click="handleSearch">Apply</button>
            <button @click="tryClose">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    
  },
  emits: ["close", "text-input"],
  data() {
    return {
      text: "",
    };
  },
  watch: {
    text(value) {
      this.$emit("text-input", value);
      // console.log(value);
    },
  },
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      // console.log("true");
      this.$emit("close");
    },
    handleSearch() {
      // console.log(this.text);
      const value = this.text;
      this.$emit("text-input", value);
    },
    signalChange: function (evt) {
      // this.$emit("change", evt);
      // console.log('input',evt.target.value);
      this.$emit("text-input", evt.target.value);
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 1vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: rgba(0, 0, 0, 0.26);
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}
button {
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
input {
  border: none !important;
}

.input-wrapper {
  position: relative;
  width: 500px;
  margin: 50px auto;
}

.input-highlight {
  font-size: 30px;
  user-select: none;
  line-height: 70px;
  border-top: 3px solid white;
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  height: 0;
  color: transparent;
  font-family: Roboto Slab, sans-serif;
  overflow: hidden;
}

input {
  height: 60px;
  width: 100%;
  min-width: 100%;
  padding: 0;
  border-radius: 0;
  line-height: 70px;
  background-color: transparent;
  color: white;
  font-size: 30;
  border: none;
  outline: none;
  border-bottom: 3px solid #333333;
  font-family: Roboto Slab, sans-serif;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>