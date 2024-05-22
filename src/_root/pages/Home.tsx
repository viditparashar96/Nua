import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { useData } from "@/providers/DataProvider";

const Home = () => {
  const { books }: any = useData();
  return (
    <div>
      <Filter />
      <div className="mt-10">
        {/* <DataTable /> */}
        <DataTable columns={columns} data={books} />
      </div>
      {/* Pagination */}
      <div className="mt-4">
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
