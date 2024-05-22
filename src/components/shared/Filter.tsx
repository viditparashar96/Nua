import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/providers/DataProvider";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const Filter = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState(
    "The lord of the rings"
  );
  const { books, limit, setSearchParam, authorName, setSearchTerm }: any =
    useData();
  const data = books.map((book: any) => {
    return {
      ...book,
      id: book.id.replace("/works/", ""),
      cover_img: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder.svg",
    };
  });

  const csvData = [
    [
      "id",
      "title",
      "top_work",
      "subject",
      "first_publish_year",
      "birth_date",
      "author_name",
      "author_key",
    ],
    ...data.map(
      ({
        id,
        title,
        top_work,
        subject,
        first_publish_year,
        birth_date,
        author_name,
        author_key,
      }: any) => [
        id,
        title,
        top_work,
        subject,

        first_publish_year,
        birth_date,
        author_name,
        author_key,
      ]
    ),
  ];

  const handleBookSearch = (e: any) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
  };

  // Debounce search For Books
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      setSearchParam({ page: "1" });

      // fecthBooks();
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className=" w-full flex gap-6 items-center">
      {/* Search for Books */}
      <div>
        <Label>Search for book</Label>
        <Input
          value={localSearchTerm}
          name="localSearchTerm"
          onChange={handleBookSearch}
          type="text"
          className=" mt-2 w-[220px]"
          placeholder="Search anything...."
        />
      </div>

      {/* Books Per Page */}
      <div>
        <Label>Books per Page</Label>
        <Select
          value={Number(limit)}
          onValueChange={(value) => {
            setSearchParam((prev: any) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("limit", value);
              newParams.set("page", "1");
              return newParams;
            });
          }}
        >
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Books per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Number</SelectLabel>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={50}>50</SelectItem>
              <SelectItem value={100}>100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search Books by Author */}

      <div>
        <Label>Search by Author</Label>
        <Input
          type="text"
          name="authorName"
          value={authorName}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchParam((prev: any) => {
                const newParams = new URLSearchParams(prev);
                newParams.delete("authorName");
                newParams.set("page", "1");
                return newParams;
              });
            }
            setSearchParam((prev: any) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("authorName", e.target.value);
              newParams.set("page", "1");
              return newParams;
            });
          }}
          className=" mt-2 w-[220px]"
          placeholder="Search author...."
        />
      </div>

      <Button className=" ml-auto">
        <CSVLink className="" filename="books.csv" data={csvData}>
          Export to CSV
        </CSVLink>
      </Button>
    </div>
  );
};

export default Filter;
