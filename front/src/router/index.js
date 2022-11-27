import { createRouter, createWebHashHistory } from "vue-router";
import Start from "../views/StartView.vue";
import Ringing from "../views/RingingView.vue";
import Connected from "../views/ConnectedView.vue";
import Answered from "../views/AnsweredView.vue";
import Failed from "../views/FailedView.vue";
import ViewManager from "../services/ViewManager";

function linearRouting(status) {
  if (ViewManager.status == null || ViewManager.status != status.toUpperCase())
    return "/";
  return true;
}

const routes = [
  {
    path: "/",
    name: "start",
    component: Start,
    beforeEnter: () => {
      ViewManager.status = null;
      return true;
    },
  },
  {
    path: "/ringing",
    name: "ringing",
    component: Ringing,
    beforeEnter: (to) => {
      return linearRouting(to.name);
    },
    props: true,
  },
  {
    path: "/connected",
    name: "connected",
    component: Connected,
    beforeEnter: (to) => {
      return linearRouting(to.name);
    },
  },
  {
    path: "/answered",
    name: "answered",
    component: Answered,
    beforeEnter: (to) => {
      return linearRouting(to.name);
    },
  },
  {
    path: "/failed",
    name: "failed",
    component: Failed,
    beforeEnter: (to) => {
      return linearRouting(to.name);
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
