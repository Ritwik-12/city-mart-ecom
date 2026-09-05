const variants = {
  primary:
    "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-300",
  secondary:
    "border border-gray-200 bg-white text-gray-800 hover:border-purple-200 hover:text-purple-600 focus-visible:ring-gray-200",
  dark:
    "bg-gray-950 text-white hover:bg-gray-800 focus-visible:ring-gray-300",
  ghost:
    "text-gray-600 hover:bg-gray-50 hover:text-purple-600 focus-visible:ring-gray-200",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-200",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    {...props}
  >
    {loading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);

export default Button;
