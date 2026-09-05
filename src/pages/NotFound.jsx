import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound = () => (
  <section className="container-page flex min-h-[60vh] items-center justify-center py-16 text-center">
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-600">404</p>
      <h1 className="mt-3 text-4xl font-black">Page not found</h1>
      <p className="mt-3 text-sm text-gray-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block"><Button>Back to home</Button></Link>
    </div>
  </section>
);

export default NotFound;
