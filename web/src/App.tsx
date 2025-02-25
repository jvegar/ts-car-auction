import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

interface Offer {
  offer_id: string;
  group_id: string;
  created_at: string;
  status: string;
  type: string;
  image_xs: string;
  image_md: string;
  name: string;
  title: string;
  model_year: string;
  financing_tag: boolean;
  information_quality: string;
  complexity_offering: string;
  mileage: number | null;
  base_price: number;
  win_now: number | null;
  live_tag: string | null;
  close_date: string;
  images: {
    thumb: string;
    image: string;
  }[];
  owner: {
    id: number;
    name: string | null;
    path: string;
    user_id: number;
    cuu: number;
  };
  description: {
    attributes: {
      attribute: string;
      value: string;
    }[];
    additional_information: string;
  };
  documents: {
    additional_documents: {
      title: string;
      route: string;
    }[];
    required: {
      title: string;
      route: string;
    }[];
  };
  conditions_url: string;
  with_visit: boolean;
  with_virtual_inspection: boolean;
  inspector_is_online: boolean;
}

function App() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedFilter = useDebounce(filter, 300);

  const offersUrl = import.meta.env.VITE_OFFERS_URL;

  const {
    data: offers,
    isLoading,
    isError,
  } = useQuery<Offer[]>({
    queryKey: [
      "offers",
      page,
      rowsPerPage,
      sortField,
      sortOrder,
      debouncedFilter,
    ],
    queryFn: async () => {
      const response = await fetch(
        `${offersUrl}?page=${page + 1}&limit=${rowsPerPage}&sort=${sortField}:${sortOrder}&search=${debouncedFilter}`
      );
      const data = await response.json();
      setTotalCount(data.totalCount);
      return data.offers;
    },
    enabled: !!debouncedFilter || debouncedFilter === "",
  });

  const handleSort = (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
    setPage(0);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching offers</div>;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filter offers"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("offer_id")}>
                Offer ID
              </TableCell>
              <TableCell onClick={() => handleSort("title")}>Title</TableCell>
              <TableCell onClick={() => handleSort("type")}>Type</TableCell>
              <TableCell onClick={() => handleSort("financing_tag")}>
                Financing Tag
              </TableCell>
              <TableCell onClick={() => handleSort("information_quality")}>
                Information Quality
              </TableCell>
              <TableCell onClick={() => handleSort("complexity_offering")}>
                Complexity Offering
              </TableCell>
              <TableCell onClick={() => handleSort("status")}>Status</TableCell>
              <TableCell onClick={() => handleSort("owner.name")}>
                Owner Name
              </TableCell>
              <TableCell onClick={() => handleSort("with_visit")}>
                With Visit
              </TableCell>
              <TableCell onClick={() => handleSort("with_virtual_inspection")}>
                With Virtual Inspection
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers?.map((offer) => (
              <TableRow key={offer.offer_id}>
                <TableCell>{offer.offer_id}</TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.type}</TableCell>
                <TableCell>{offer.financing_tag ? "Yes" : "No"}</TableCell>
                <TableCell>{offer.information_quality}</TableCell>
                <TableCell>{offer.complexity_offering}</TableCell>
                <TableCell>{offer.status}</TableCell>
                <TableCell>{offer.owner?.name}</TableCell>
                <TableCell>{offer.with_visit ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {offer.with_virtual_inspection ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default App;
