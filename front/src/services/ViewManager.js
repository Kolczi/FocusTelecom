import router from "../router";
import io from "socket.io-client";
import config from "../config.json";

class ViewManager {
  constructor() {
    this.interval = null;
    this.status = null;
    this.socket = null;
  }
  changeView() {
    console.log(this.status);
    switch (this.status) {
      case "CONNECTED":
        router.push({ name: "connected" });
        break;
      case "FAILED":
        router.push({ name: "failed" });
        this.killSocket();
        break;
      case "ANSWERED":
        router.push({ name: "answered" });
        this.killSocket();
        break;
      case "RINGING":
        router.push({ name: "ringing" });
        break;
      case null:
        console.log("status is null");
        this.killSocket();
        break;
    }
  }

  killSocket() {
    this.socket.disconnect();
  }

  checkStatus() {
    this.socket = io(config.baseUrl, {
      reconnection: false,
      transports: ["websocket", "polling"],
    });
    this.socket.on("status", (status) => {
      if (status !== this.status) {
        this.status = status;
        this.changeView();
      }
    });
  }
}
export default new ViewManager();
