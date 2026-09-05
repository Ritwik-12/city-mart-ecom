import PageHeader from "../components/common/PageHeader";

const SimplePage = ({ title, description }) => (
  <>
    <PageHeader title={title} description={description} />
    <section className="container-page py-16">
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-sm leading-7 text-gray-600">
        This page is ready for your business content. The core shopping experience is connected to the Spring Boot APIs.
      </div>
    </section>
  </>
);

export default SimplePage;
