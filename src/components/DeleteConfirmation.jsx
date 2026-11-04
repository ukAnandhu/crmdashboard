
import { AlertTriangle, X, Trash2 } from "lucide-react";

function DeleteConfirmation({ customer, onCancel, onConfirm }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

        <div className="mb-5 flex items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={25} />
          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          Delete Customer?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-800">
            {customer.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmation;
