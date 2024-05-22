import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/providers/DataProvider";

export default function DataTable() {
  const { books }: any = useData();
  console.log(books);
  const bookswithImages = books.map((book: any) => {
    return {
      ...book,
      id: book.id.replace("/works/", ""),
      cover_img: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder.svg",
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">img</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="hidden md:table-cell">
                Author name
              </TableHead>
              <TableHead className="hidden md:table-cell">Author DOB</TableHead>
              <TableHead className="hidden md:table-cell">
                First Publish Year
              </TableHead>
              <TableHead className="hidden md:table-cell">Top Work</TableHead>
              <TableHead className="hidden md:table-cell">Subjects</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookswithImages?.map((book: any) => {
              return (
                <TableRow key={book?.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Book image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={book.cover_img}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      {book.ratings_average
                        ? book.ratings_average.toFixed(1)
                        : "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.author_name[0]}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.birth_date ? book.birth_date : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.first_publish_year}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.top_work ? book.top_work : "N/A"}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
            {/* <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/placeholder.svg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
