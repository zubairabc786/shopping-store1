"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const MaxInput = ({ placeholder2 }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("max", e.target.value);
    } else {
      params.delete("max");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex items-center relative gap-1">
      <label htmlFor="">Max-Price</label>
      <input
        type="text"
        placeholder={placeholder2}
        onChange={handleSearch}
        className="h-10 bg-blue-50 pl-4 w-24 rounded-r-full border-[1px] border-blue-600 outline-none"
      />
    </div>
  );
};

export default MaxInput;
