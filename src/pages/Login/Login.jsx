import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../../store/slices/authSlice";
import Button from "../../components/common/Button";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }

    return () => dispatch(clearAuthError());
  }, [user, navigate, dispatch]);

  const onSubmit = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();

      toast.success("Welcome back!");

      navigate(location.state?.from || "/", {
        replace: true,
      });
    } catch {
      // Error is handled through Redux state
    }
  };

  return (
    <section className="container-page py-8 sm:py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/40 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 lg:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="hidden bg-purple-50 p-10 transition-colors duration-300 dark:bg-purple-950/30 lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white">
              <ShoppingBag size={21} />
            </span>

            <h1 className="mt-10 text-4xl font-black tracking-tight text-gray-950 dark:text-white">
              Welcome back.
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-300">
              Sign in to manage your cart, addresses and orders in one place.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ["Secure account", ShieldCheck],
                ["Faster checkout", ShoppingBag],
                ["Easy order management", LockKeyhole],
              ].map(([text, Icon]) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  <Icon
                    size={19}
                    className="text-purple-600 dark:text-purple-400"
                  />

                  {text}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your shopping journey starts here.
          </p>
        </div>

        {/* LOGIN FORM */}

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">

            <h2 className="text-2xl font-black text-gray-950 dark:text-white sm:text-3xl">
              Login to your account
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Create one
              </Link>
            </p>

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 space-y-5"
            >
              {/* USERNAME */}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Username
                </span>

                <span className="flex items-center rounded-xl border border-gray-200 transition focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-purple-500 dark:focus-within:ring-purple-500/10">
                  <Mail
                    size={18}
                    className="ml-3 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    {...register("userName", {
                      required: "Username is required",
                    })}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                  />
                </span>

                {errors.userName && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.userName.message}
                  </span>
                )}
              </label>

              {/* PASSWORD */}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Password
                </span>

                <span className="flex items-center rounded-xl border border-gray-200 transition focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-purple-500 dark:focus-within:ring-purple-500/10">
                  <LockKeyhole
                    size={18}
                    className="ml-3 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
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
                </span>

                {errors.password && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>

              {/* SUBMIT */}

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;