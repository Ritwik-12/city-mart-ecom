import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import Button from "../../components/common/Button";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      await dispatch(
        registerUser({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();

      toast.success("Account created. Please sign in.");

      navigate("/login");
    } catch {}
  };

  const Field = ({
    name,
    label,
    icon: Icon,
    type = "text",
    ...props
  }) => (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </span>

      <span className="flex items-center rounded-xl border border-gray-200 bg-white transition-colors focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-purple-500 dark:focus-within:ring-purple-900/30">
        <Icon
          size={18}
          className="ml-3 text-gray-400 dark:text-gray-500"
        />

        <input
          {...register(name, props.rules)}
          type={type}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          placeholder={props.placeholder}
        />

        {name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="mr-3 text-gray-400 transition hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400"
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        )}
      </span>

      {errors[name] && (
        <span className="mt-1 block text-xs text-red-500 dark:text-red-400">
          {errors[name].message}
        </span>
      )}
    </label>
  );

  return (
    <section className="container-page py-8 sm:py-14">
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 sm:p-10">
        {/* HEADER */}

        <div className="text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
            <UserRound size={20} />
          </span>

          <h1 className="mt-5 text-2xl font-black text-gray-950 dark:text-white sm:text-3xl">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join Ecom and start shopping.
          </p>
        </div>

        {/* API ERROR */}

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 space-y-5"
        >
          <Field
            name="username"
            label="Username"
            icon={UserRound}
            placeholder="Choose a username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "At least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20 characters",
              },
            }}
          />

          <Field
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            }}
          />

          <Field
            name="password"
            label="Password"
            icon={LockKeyhole}
            type={showPassword ? "text" : "password"}
            placeholder="At least 6 characters"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            }}
          />

          {/* CONFIRM PASSWORD */}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Confirm password
            </span>

            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
              placeholder="Repeat your password"
            />

            {errors.confirmPassword && (
              <span className="mt-1 block text-xs text-red-500 dark:text-red-400">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Create account
          </Button>
        </form>

        {/* LOGIN LINK */}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;