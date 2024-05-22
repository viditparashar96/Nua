import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Book = {
  id: string;
  title: string;
  cover_i: number;
  ratings_average: number;
  top_work: string;
  subject: string[];
  first_publish_year: number;
  birth_date: string;
  author_name: string[];
  author_key: string[];
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "cover",
    header: "Cover",
    cell: ({ row }) => {
      return (
        <img
          alt="Book image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`https://covers.openlibrary.org/b/id/${row.original.cover_i}-M.jpg`}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            console.log(column.getIsSorted());
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "ratings_average",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ratings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      //   <div className="lowercase">{row.getValue("ratings_average")}</div>
      <Badge variant="destructive">
        {row.getValue("ratings_average")
          ? row.getValue("ratings_average").toFixed(1)
          : "N/A"}
      </Badge>
    ),
  },
  {
    accessorKey: "author_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.author_name[0]}</div>
    ),
  },
  {
    accessorKey: "birth_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author DOB
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dov: any = row.getValue("birth_date");
      return <div className="lowercase">{dov ? dov : "N/A"}</div>;
    },
  },
  {
    accessorKey: "first_publish_year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Publish Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "top_work",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Top Work
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
    cell: ({ row }) => {
      console.log(row.original.subject);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[70%]  overflow-x-hidden overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Script Parameters</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%] sm:table-cell">S No.</TableHead>
                  <TableHead className="w-[45%] sm:table-cell">
                    Subjects
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {row.original?.subject?.map((sub: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{index + 1}</div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className="text-xs  text-clip-ellipsis break-words"
                        variant="secondary"
                      >
                        {sub}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
