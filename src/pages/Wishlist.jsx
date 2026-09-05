import { Heart } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const Wishlist = () => (
  <>
    <PageHeader eyebrow="Account" title="Wishlist" description="Save products you want to come back to." />
    <section className="container-page py-10">
      <EmptyState
        title="Wishlist is not available yet"
        description="The current Spring Boot API does not expose wishlist endpoints. The UI is ready for that feature when the backend is added."
        action={<Link to="/shop"><Button>Browse products</Button></Link>}
      />
    </section>
  </>
);

export default Wishlist;
