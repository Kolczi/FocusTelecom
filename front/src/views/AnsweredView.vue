<template>
  <div class="box">
    <div class="text">Połączenie zakończone.</div>
    <div class="call-button-bottom" @click="tryAgain">
      <button class="btn">
        <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg>
        <span>Zadzwoń teraz</span>
      </button>
    </div>
  </div>
</template>

<script>
import ViewManager from "../services/ViewManager";
export default {
  methods: {
    tryAgain() {
      ViewManager.status = null;
      this.$router.push("/");
    },
  },
};
</script>
