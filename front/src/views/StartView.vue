<template>
  <div>
    <div class="header clearfix">
      Zadzwonimy do Ciebie w ciągu {{ time }} sekund.
    </div>
    <div class="error" v-if="err">Coś poszło nie tak! Spróbuj jeszcze raz</div>
    <label class="form-label clearfix" for="form-number">
      Wprowadź
      <span v-if="numerr" style="text-decoration: underline">poprawny</span>
      numer
    </label>
    <input
      v-model="number"
      @change="validateNumber()"
      class="form-number clearfix"
      id="form-number"
    />
    <div @click="countDown()">
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
import VievManager from "../services/ViewManager";
import config from "../config.json";

export default {
  data() {
    return {
      number: "",
      time: 5,
      err: null,
      numerr: null,
    };
  },
  methods: {
    validateNumber() {
      if (this.number.length == 0) {
        this.numerr = false;
        return;
      }
      if (this.number.length != 9) {
        this.numerr = true;
        return;
      }
      for (let i = 0; i < this.number.length; i++) {
        const element = this.number[i];
        if (!(element <= "9" && element >= "0")) {
          this.numerr = true;
          return;
        }
      }
      this.numerr = false;
      return;
    },
    countDown() {
      this.err = null;
      let ct = setInterval(() => {
        this.time = this.time - 1;
        if (this.time == 0) {
          clearInterval(ct);
          this.call();
          VievManager.checkStatus();
        }
      }, 1000);
    },
    async call() {
      try {
        let responseStream = await fetch(config.baseUrl + "/call", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ number: this.number }),
        });

        let response = await responseStream.json();
        this.$router.push({
          name: "ringing",
          params: { callsId: response.id },
        });
      } catch {
        this.err = 1;
        this.time = 5;
        VievManager.killSocket();
      }
    },
  },
};
</script>
