import UI from "./ui.js";

export default class App {
    constructor() {
        console.log('App initialising');
        this.ui = new UI("app");
    }
}