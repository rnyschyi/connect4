import ReactDOM from "react-dom";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reducer from "./store/reducer";

const store: Store<GameState, Action> & { dispatch: DispatchType } = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById("root"));