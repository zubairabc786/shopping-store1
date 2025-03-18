"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";

const MinInput = ({ placeholder1 }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("min", e.target.value);
    } else {
      params.delete("min");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex items-center relative gap-1">
      <label htmlFor="">Min-Price</label>
      <input
        type="text"
        placeholder={placeholder1}
        onChange={handleSearch}
        className="h-10 bg-blue-50 pl-4 w-24 rounded-r-full border-[1px] border-blue-600 outline-none"
      />
    </div>
  );
};

export default MinInput;
