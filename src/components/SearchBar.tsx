export function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        text-lg
        pointer-events-none
        mt-1
      "
      >
        🔍
      </div>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          mt-2

          rounded-2xl
          border border-white/10

          bg-black/20
          backdrop-blur-md

          py-4
          pl-12
          pr-4

          text-white
          text-lg
          placeholder:text-slate-400

          outline-none

          transition-all duration-300

          focus:border-lime-400/50
          focus:ring-4
          focus:ring-lime-400/10

          hover:border-purple-400/40
        "
      />
    </div>
  );
}
