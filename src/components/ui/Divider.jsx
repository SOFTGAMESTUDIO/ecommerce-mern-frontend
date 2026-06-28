function Divider({ text = "OR" }) {
  return (
    <div className="flex items-center gap-4 my-6">

      <div className="flex-1 h-px bg-slate-300" />

      <span className="text-sm text-slate-500">

        {text}

      </span>

      <div className="flex-1 h-px bg-slate-300" />

    </div>
  );
}

export default Divider;