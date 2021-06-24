import logo from "./logo.svg";
import "./App.css";
import useAppStore from "./store";
import { useEffect } from "react";
import shallow from "zustand/shallow";

function App() {
  const [products, clear, loadProducts] = useAppStore(
    (state) => [state.products, state.clear, state.loadProducts],
    shallow
  );

  useEffect(() => {
    clear();
    loadProducts();
  }, [clear, loadProducts]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </header>
    </div>
  );
}

export default App;
