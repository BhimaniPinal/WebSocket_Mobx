import { observable, action, makeObservable, computed } from "mobx";

export enum Message {
  CONNECTED = "Connected",
  ERROR = "Error occurred",
  DISCONNECT = "Disconnected"
}

export class DashBoardViewModel {
  @observable
  wssUrl: string = "wss://ws.blockchain.info/inv";

  @observable
  showOutput: boolean = true;

  @observable
  eventPayload: string = "";

  @observable
  webSocketOutput: string = "";

  @observable
  websocket: any;

  constructor() {
    makeObservable(this);
  }

  @computed
  get isValidAddress(): boolean {
    const expression = new RegExp(/^wss:/i);
    let result = expression.test(this.wssUrl);
    return result;
  }

  @computed
  get isValidJSONString(): boolean {
    try {
      JSON.parse(this.eventPayload);
    } catch (e) {
      return false;
    }
    return true;
  }

  @action.bound
  handleClear = () => {
    this.webSocketOutput = "";
  };

  @action.bound
  handleConnect = async () => {
    if (this.wssUrl && this.isValidAddress) {
      this.websocket = new WebSocket(this.wssUrl);

      this.websocket.onopen = async () => {
        await this.setWebSocketOutput(Message.CONNECTED);
      };
      this.websocket.onerror = async () => {
        await this.setWebSocketOutput(Message.ERROR);
      };
      this.websocket.onclose = async () => {
        await this.setWebSocketOutput(Message.DISCONNECT);
      };
    }
  };

  @action.bound
  handleDisconnect = async () => {
    if (this.websocket) {
      await this.websocket.close();
      this.setWebSocketOutput(Message.DISCONNECT);
    }
  };

  @action.bound
  handleSend = async () => {
    if (this.websocket && this.eventPayload && this.isValidJSONString) {
      await this.websocket.send(this.eventPayload);
      this.setWebSocketOutput("Send: " + this.eventPayload);
      this.websocket.onmessage = (response: any) => {
        this.setWebSocketOutput("Receive: " + response.data);
      };
    }
  };

  @action.bound
  handleShowOutput = (event: any) => {
    if (event.target) {
      this.showOutput = event.target.checked;
    }
  };

  @action.bound
  setWssUrl = (event: any) => {
    if (event.target.value) this.wssUrl = event.target.value;
  };

  @action.bound
  setEventPayload = (event: any) => {
    if (event.target.value) this.eventPayload = event.target.value;
  };

  @action.bound
  setWebSocketOutput = (data: string) => {
    if (this.showOutput) {
      this.webSocketOutput = this.webSocketOutput + "\n" + data;
    }
  };
}

export const dashBoardViewModel = new DashBoardViewModel();
