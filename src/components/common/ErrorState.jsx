import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
    <AlertCircle className="mx-auto text-red-500" size={28} />
    <p className="mt-3 text-sm font-medium text-red-800">{message}</p>
    {onRetry && (
      <Button variant="secondary" className="mt-5" onClick={onRetry}>
        <RefreshCw size={16} />
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
