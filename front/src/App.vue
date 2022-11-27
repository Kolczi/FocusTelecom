<template>
  <div class="window">
    <router-view />
  </div>
</template>

<style>
body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.window {
  width: 800px;
  height: 500px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.clearfix:after {
  content: "";
  clear: both;
  display: table;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 1.15em;
}
.box {
  text-align: center;
}
.text {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
.header,
.form-number {
  margin-bottom: 50px;
}
.header {
  margin-top: 50px;
  font-size: 38px;
  font-weight: 600;
}
.form-label {
  font-size: 32px;
  font-weight: 600;
}
.form-number {
  width: 400px;
  height: 55px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 28px;
  letter-spacing: 2px;
  text-align: center;
}
.call-button,
.call-button-bottom {
  width: 300px;
  height: 75px;
  vertical-align: middle;
  font-size: 22px;
  font-weight: 600;
  line-height: 75px;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 auto;
}

.call-button-bottom {
  margin-top: 300px;
}
.call-button:hover {
  filter: brightness(80%);
}
.error {
  font-size: large;
  border: 1px solid #ff0000;
  background: rgb(255, 170, 170);
}
.btn {
  position: relative;
  padding: 0;
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91c9ff;
  outline: none;
  transition: 1s ease-in-out;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
}

.btn:hover {
  transition: 1s ease-in-out;
  background: #4f95da;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}

.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}
</style>
