import { Toaster } from 'react-hot-toast';
import { Home } from "./pages/Home";


export const App = () => {
  return (
    <div className="min-h-screen">
      <Toaster/>
      <Home/>
    </div>
   
  );
};
