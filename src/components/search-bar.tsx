"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ArrowUpAZ, ArrowDownAZ, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: number;
  creator: string;
  title: string;
  description: string;
  tags: string[];
}

interface SearchComponentProps {
  data: SearchItem[];
}

const SearchComponent = ({ data }: SearchComponentProps) => {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [filteredData, setFilteredData] = useState<SearchItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase().trim();

    if (lowerCaseQuery.length > 0) {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseQuery)
      );

      if (sortOrder === "asc") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === "desc") {
        results.sort((a, b) => b.title.localeCompare(a.title));
      }

      setFilteredData(results);
      setShowDropdown(true);
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  }, [query, sortOrder, data]);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 relative">
      {/* Search Input and Sort Dropdown */}
      <div className="w-full md:w-[40%] max-w-lg flex flex-col sm:flex-row gap-4 relative">
        {/* Search Bar with Icon */}
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search your data..."
            className="w-full min-w-60 pr-10"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />

          {/* Dropdown below search input */}
          {showDropdown && (
            <div
              className={cn(
                "absolute top-full mt-1 w-full max-h-72 overflow-auto border bg-white z-50 shadow-lg rounded-md",
                filteredData.length === 0 && "p-4 text-sm text-muted-foreground text-center"
              )}
            >
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setQuery(item.title);
                      setShowDropdown(false);
                    }}
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 z-[60]">
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>
              <span className="flex justify-between items-center w-full">
                Title Ascending <ArrowUpAZ className="ml-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>
              <span className="flex justify-between items-center w-full">
                Title Descending <ArrowDownAZ className="ml-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export { SearchComponent };
