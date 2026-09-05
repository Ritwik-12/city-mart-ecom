const PageHeader = ({ eyebrow, title, description }) => (
  <section className="border-b border-gray-100 bg-gray-50/70 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
    <div className="container-page py-10 sm:py-14">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600 dark:text-purple-400">
          {eyebrow}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  </section>
);

export default PageHeader;