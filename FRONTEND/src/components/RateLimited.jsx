import { AlertOctagon, X } from "lucide-react";
const RateLimited = ({onRateLimited }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className=" bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={()=>onRateLimited(false)}
      />

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all border border-primary-100 bg-primary">
        <button
          onClick={()=>onRateLimited(false)}
          className="absolute right-4 top-4 font-semibold text-slate-900 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertOctagon size={28} />
          </div>

          <h3 className="text-lg font-bold text-gray-900">ALERT!</h3>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            You have to much attempts to fetching datas please wait around about{" "}
            <span className="font-semibold text-red-900 text-xl">1 Minutes</span> {" "}
            Try again later
          </p>

          <button
            onClick={()=>onRateLimited(false)}
            className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all active:scale-95"
          >
           Understandable
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;
