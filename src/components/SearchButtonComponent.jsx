"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchButtonComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleClickLowToHigh = () => {
    const params = new URLSearchParams(searchParams);
    params.set("p", `{ "price":"asc" }`);
    router.replace(`${pathname}?${params}`);
  };

  const handleClickHighToLow = () => {
    const params = new URLSearchParams(searchParams);
    params.set("p", `{ "price":"desc" }`);
    router.replace(`${pathname}?${params}`);
  };

  const handleClickAscending = () => {
    const params = new URLSearchParams(searchParams);
    params.set("p", `{ "name":"asc" }`);
    router.replace(`${pathname}?${params}`);
  };
  const handleClickDescending = () => {
    const params = new URLSearchParams(searchParams);
    params.set("p", `{ "name":"desc" }`);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center ">
      <button
        onClick={handleClickLowToHigh}
        className="bg-redDark hover:bg-redLight px-6 py-2 rounded-lg text-white text-base font-bold"
      >
        Low To High
      </button>
      <button
        onClick={handleClickHighToLow}
        className="bg-redDark hover:bg-redLight px-6 py-2 rounded-lg text-white text-base font-bold"
      >
        High To Low
      </button>
      <button
        onClick={handleClickAscending}
        className="bg-redDark hover:bg-redLight px-6 py-2 rounded-lg text-white text-base font-bold"
      >
        Ascending
      </button>
      <button
        onClick={handleClickDescending}
        className="bg-redDark hover:bg-redLight px-6 py-2 rounded-lg text-white text-base font-bold"
      >
        Desending
      </button>
    </div>
  );
};

export default SearchButtonComponent;
