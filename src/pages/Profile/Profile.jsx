import {
  LogOut,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      toast.success("Signed out.");

      navigate("/");
    } catch {
      toast.error("Unable to sign out.");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="My account"
        description="Manage your account and saved delivery information."
      />

      <section className="container-page py-8 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* PROFILE CARD */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                <UserRound size={25} />
              </span>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-black text-gray-950 dark:text-white">
                  {user?.username || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {user?.roles?.join(", ") || "ROLE_USER"}
                </p>
              </div>
            </div>

            {/* QUICK ACTIONS */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                to="/addresses"
                className="group rounded-xl border border-gray-100 bg-white p-4 transition hover:border-purple-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-700"
              >
                <MapPin
                  className="text-purple-600 dark:text-purple-400"
                  size={19}
                />

                <p className="mt-3 text-sm font-bold text-gray-900 transition group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  Addresses
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Manage delivery addresses.
                </p>
              </Link>

              <Link
                to="/cart"
                className="group rounded-xl border border-gray-100 bg-white p-4 transition hover:border-purple-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-700"
              >
                <ShieldCheck
                  className="text-purple-600 dark:text-purple-400"
                  size={19}
                />

                <p className="mt-3 text-sm font-bold text-gray-900 transition group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  Shopping cart
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Review your current cart.
                </p>
              </Link>
            </div>
          </div>

          {/* SESSION CARD */}

          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-bold text-gray-950 dark:text-white">
              Session
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your authentication is maintained by the backend JWT cookie.
            </p>

            <Button
              variant="secondary"
              onClick={logout}
              className="mt-5 w-full"
            >
              <LogOut size={17} />
              Sign out
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;