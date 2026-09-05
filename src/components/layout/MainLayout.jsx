import { Outlet } from "react-router-dom";;
import Navbar from "./Navbar";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const MainLayout = () => (
  <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
   
    <Navbar />
    <NavigationBar />
    <main className="min-w-0 flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
