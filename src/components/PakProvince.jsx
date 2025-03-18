import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { PakProvinces } from "../Data/data";
import { Check, ChevronsUpDown } from "lucide-react";

const PakProvince = ({ handleProvinceValue }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = (value) => {
    handleProvinceValue(value);
  };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between"
          >
            {value
              ? PakProvinces.find((framework) => framework.value === value)
                  ?.label
              : "Select State..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Command>
            <CommandInput placeholder="Search State..." />
            <CommandList>
              <CommandEmpty>No State found.</CommandEmpty>
              <CommandGroup>
                {PakProvinces.map((framework) => (
                  <CommandItem
                    // onClick={handleClick}
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      handleClick(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PakProvince;
