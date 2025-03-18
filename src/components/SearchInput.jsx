"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";

const SearchInput = ({ placeholder }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const reDirect = () => {
    router.push("/products-sort");
  };
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="relative w-full max-w-md mx-auto flex">
      <SearchIcon
        size={42}
        className="absolute -left-16 -top-5 lg:left-0 lg:top-0 p-2   text-gray-900 lg:text-white lg:bg-blue-600 rounded-l-full lg:p-3"
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        onClick={reDirect}
        className="hidden lg:block w-full pl-11 outline-none py-2 rounded-full  text-gray-900  border-[1px]
        border-blue-600 focus:border-blue-600"
      />
    </div>
  );
};

export default SearchInput;
