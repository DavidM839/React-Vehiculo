import './App.css';
import VehiculoCrud from './componentes/VehiculoCrud';
import ClienteCrud from './componentes/ClienteCrud';
import VentaCrud from './componentes/VentasCrud';
function App() {
  return (
    <div className="App">
     
        <VehiculoCrud/>
       <ClienteCrud/>
       <VentaCrud/>
    </div>
  );
}

export default App;
