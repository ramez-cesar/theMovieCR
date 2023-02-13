import Template from "./template/main.js";
// import '../src/styles/style.css'

(async function App() {
    const view = document.querySelector('#mian')
	view.innerHTML = await Template();
})();