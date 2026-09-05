import { useEffect, useState } from "react";
import { MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "../../services/addressService";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import { toast } from "sonner";

const blank = {
  street: "",
  buildingName: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
};

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () =>
    getUserAddresses()
      .then(setAddresses)
      .catch(() => toast.error("Unable to load addresses."));

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editing) {
        await updateAddress(editing, form);
      } else {
        await createAddress(form);
      }

      toast.success(editing ? "Address updated." : "Address added.");

      setOpen(false);
      setEditing(null);
      setForm(blank);

      load();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to save address.",
      );
    } finally {
      setSaving(false);
    }
  };

  const edit = (address) => {
    setEditing(address.id);

    setForm({
      street: address.street || "",
      buildingName: address.buildingName || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "India",
      pincode: address.pincode || "",
    });

    setOpen(true);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      await deleteAddress(id);
      toast.success("Address deleted.");
      load();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete address.",
      );
    }
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
    setForm(blank);
  };

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Saved addresses"
        description="Manage the delivery addresses used during checkout."
      />

      <section className="container-page py-8 sm:py-10">
        {/* ADD ADDRESS */}

        <div className="mb-5 flex justify-end">
          <Button
            onClick={() => {
              setEditing(null);
              setForm(blank);
              setOpen(true);
            }}
          >
            <Plus size={17} />
            Add address
          </Button>
        </div>

        {/* ADDRESS GRID */}

        {addresses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-14 text-center transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <MapPin size={24} />
            </div>

            <h2 className="mt-4 font-bold text-gray-950 dark:text-white">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Add a delivery address to make checkout faster and easier.
            </p>

            <Button
              className="mt-5"
              onClick={() => {
                setEditing(null);
                setForm(blank);
                setOpen(true);
              }}
            >
              <Plus size={17} />
              Add your first address
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/40 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-900 dark:hover:shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                    <MapPin size={19} />
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() => edit(address)}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-500 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      aria-label="Edit address"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => remove(address.id)}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                      aria-label="Delete address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h2 className="mt-4 text-sm font-bold text-gray-950 dark:text-white">
                  {address.buildingName}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {address.street}, {address.city}
                  <br />
                  {address.state}, {address.country}
                  <br />
                  {address.pincode}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* ADD / EDIT MODAL */}

        {open && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onMouseDown={closeModal}
          >
            <div
              className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl transition-colors duration-300 dark:bg-gray-900 sm:rounded-3xl sm:p-8"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                    {editing ? "Edit address" : "Add address"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {editing
                      ? "Update your delivery information."
                      : "Add a new delivery location."}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* FORM */}

              <form
                onSubmit={submit}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                {[
                  [
                    "buildingName",
                    "Building / house",
                    "e.g. Green View Apartments",
                  ],
                  ["street", "Street", "Street name"],
                  ["city", "City", "Kolkata"],
                  ["state", "State", "West Bengal"],
                  ["country", "Country", "India"],
                  ["pincode", "Pincode", "700001"],
                ].map(([name, label, placeholder]) => (
                  <label
                    key={name}
                    className={
                      name === "buildingName" || name === "street"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <span className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {label}
                    </span>

                    <input
                      required
                      value={form[name]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [name]: e.target.value,
                        })
                      }
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-purple-500 dark:focus:ring-purple-950/40"
                    />
                  </label>
                ))}

                <div className="mt-2 flex gap-3 sm:col-span-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    loading={saving}
                    className="flex-1"
                  >
                    {editing ? "Save changes" : "Add address"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Addresses;