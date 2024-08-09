import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PostsList from "./components/PostsList";
import ViewToggle from "./components/ViewToggle";

function App() {
  return (
    <Provider store={store}>
    <div className="App" style={{backgroundColor:"#e6eef4"}}>
      {/* <ViewToggle/> */}
      <PostsList/>
    </div>
    </Provider>
  );
}

export default App;
