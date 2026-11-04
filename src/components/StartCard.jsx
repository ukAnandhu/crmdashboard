
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp
} from "lucide-react";

const iconMap = {
  users: Users,
  active: UserCheck,
  inactive: UserX
};

const colorMap = {
  users: "bg-indigo-50 text-indigo-600",
  active: "bg-emerald-50 text-emerald-600",
  inactive: "bg-orange-50 text-orange-600"
};

function StartCard({ title, value, description, type }) {
  const Icon = iconMap[type] || Users;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="mb-5 flex items-center justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-xl ${colorMap[type]}`}>
          <Icon size={23} />
        </div>

        <TrendingUp size={18} className="text-emerald-500" />
      </div>

      <h3 className="text-3xl font-bold text-slate-800">
        {value}
      </h3>

      <p className="mt-2 text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default StartCard;
