import React, { createContext, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const DataContext: any = createContext(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("The lord of the rings");
  // const [page, setPage] = useState(1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [totalPages, setTotalPages] = useState(0);
  // const [limit, setLimit] = useState(100); // [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const authorName = searchParam.get("authorName") || "";
  const limit: any = searchParam.get("limit") || 10;
  const page: any = searchParam.get("page") || 1;

  if (authorName) {
    console.log("authorName===>", authorName);
  }

  const fecthBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      const { docs } = data;
      const { numFound } = data;
      if (numFound > 0) {
        setTotalPages(Math.ceil(numFound / limit));
      }

      if (docs) {
        const booksWithAuthors = docs.filter((book: any) => book.author_name);
        console.log("booksWithAuthors==>", booksWithAuthors);
        const bookswithauthorPromise = booksWithAuthors.map(
          async (bookSingle: any) => {
            try {
              setLoading(true);
              const {
                key,
                ratings_average,
                subject,
                cover_edition_key,
                cover_i,
                author_key,
                edition_count,
                first_publish_year,
                author_name,
                title,
              } = bookSingle;

              const author = await fetch(
                `https://openlibrary.org/search/authors.json?q=${author_name[0]}`
              );
              const { docs } = await author.json();
              const { top_work, birth_date } = docs[0];
              return {
                id: key,
                cover_i,
                edition_count,
                first_publish_year,
                title,
                author_name,
                top_work,
                birth_date,
                cover_edition_key,
                ratings_average: ratings_average,
                subject: subject,

                author_key,
              };
            } catch (error) {
              console.log(error);
              setLoading(false);
            } finally {
              setLoading(false);
            }
          }
        );
        const booksData: any = await Promise.all(bookswithauthorPromise);
        setBooks(booksData);

        if (bookswithauthorPromise.length > 1) {
          setResultTitle("Your Search Result");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, limit]);

  const fecthBooksByAuthor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`
     https://openlibrary.org/search.json?author=${authorName}&page=${page}&limit=${limit}
     `);
      const data = await response.json();
      const { docs } = data;
      console.log("docs of Author Data==>", docs);
      const { numFound } = data;
      if (numFound > 0) {
        setTotalPages(Math.ceil(numFound / limit));
      }

      const booksWithAuthorsPromise = docs.map(async (book: any) => {
        const {
          key,
          ratings_average,
          subject,
          cover_edition_key,
          cover_i,
          author_key,
          edition_count,
          first_publish_year,
          author_name,
          title,
        } = book;
        const author = await fetch(
          `https://openlibrary.org/search/authors.json?q=${author_name[0]}`
        );
        const { docs } = await author.json();
        const { top_work, birth_date } = docs[0];
        return {
          id: key,
          cover_i,
          edition_count,
          first_publish_year,
          title,
          top_work,
          birth_date,
          author_name,
          cover_edition_key,
          ratings_average: ratings_average,
          subject: subject,
          author_key,
        };
      });
      const booksWithAuthorsData: any = await Promise.all(
        booksWithAuthorsPromise
      );
      setBooks(booksWithAuthorsData);
      if (booksWithAuthorsData.length > 1) {
        setResultTitle("Your Search Result");
      } else {
        setResultTitle("No Search Result Found!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [authorName, page, limit]);

  //  Pagination Methods

  const handleNext = () => {
    setSearchParam((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(Number(page) + 1));
      return newParams;
    });
  };

  const handlePrev = () => {
    setSearchParam((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(Number(page) - 1));
      return newParams;
    });
  };

  const goToLastPage = () => {
    setSearchParam((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(totalPages));
      return newParams;
    });
  };

  const goToFirstPage = () => {
    setSearchParam((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", "1");
      return newParams;
    });
  };

  // Book Search by Author

  useEffect(() => {
    if (authorName) {
      console.log("authorName===>", authorName);
      const timer = setTimeout(() => {
        fecthBooksByAuthor();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      console.log("Inside Else");
      fecthBooks();
    }
  }, [searchTerm, page, limit, searchParam, authorName]);

  console.log("loading", loading);
  return (
    <DataContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        books,
        setBooks,
        totalPages,
        loading,
        setLoading,
        resultTitle,
        setResultTitle,
        fecthBooks,
        searchParam,
        setSearchParam,
        page,
        limit,
        handlePrev,
        handleNext,
        goToLastPage,
        goToFirstPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
