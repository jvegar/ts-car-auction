import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material'
import './App.css'


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
  }[]
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
  const [offers, setOffers] = useState<Offer[]>([])
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const offersUrl = import.meta.env.VITE_OFFERS_URL; // Access the offers URL from the environment variable

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(`${offersUrl}?page=${page + 1}&limit=${rowsPerPage}`)
      const data = await response.json()
      setOffers(data.offers)
      setTotalCount(data.totalCount)
    }

    fetchOffers()
  }, [page, rowsPerPage, offersUrl]) // Add offersUrl to the dependency array

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to the first page
  }

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
              <TableCell>Offer ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Financing Tag</TableCell>
              <TableCell>Information Quality</TableCell>
              <TableCell>Complexity Offering</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>With Visit</TableCell>
              <TableCell>With Virtual Inspection</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.offer_id}>
                <TableCell>{offer.offer_id}</TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.type}</TableCell>
                <TableCell>{offer.financing_tag ? 'Yes' : 'No'}</TableCell>
                <TableCell>{offer.information_quality}</TableCell>
                <TableCell>{offer.complexity_offering}</TableCell>
                <TableCell>{offer.status}</TableCell>
                <TableCell>{offer.owner?.name}</TableCell>
                <TableCell>{offer.with_visit ? 'Yes' : 'No'}</TableCell>
                <TableCell>{offer.with_virtual_inspection ? 'Yes' : 'No'}</TableCell>
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
  )
}

export default App
