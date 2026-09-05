import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../store/slices/authSlice";
import { fetchCart } from "../store/slices/cartSlice";

const SessionBootstrap = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  useEffect(() => {
    const handler = () => {
      // The auth request that receives 401 will be followed by restoreSession
      // on the next application lifecycle. We intentionally do not hard-redirect
      // from here so public pages remain usable.
    };
    window.addEventListener("ecom:unauthorized", handler);
    return () => window.removeEventListener("ecom:unauthorized", handler);
  }, []);

  return null;
};

export default SessionBootstrap;
