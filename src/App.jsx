import AppRoutes from "./routes/AppRoutes";
import SessionBootstrap from "./components/SessionBootstrap";

function App() {
  return (
    <>
      <SessionBootstrap />
      <AppRoutes />
    </>
  );
}

export default App;
