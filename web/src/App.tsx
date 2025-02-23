import { useState, useEffect } from 'react'
import './App.css'


interface Offer {
  id: string;
  group_id: string;
  state: string;
  offer_type: string;
  image_xs: string;
  image_md: string;
  name: string;
  title: string;
  model_year: string;
  is_financing: boolean;
  mileage: number | null;
  base_price: number;
  win_now: number | null;
  live_tag: string | null;
  close_date: string;
  readable_close_date: {
      date: string;
      time: string;
      meridian: string;
  };
  stats: {
      views: number;
      interested: number;
      participants: number;
      negotiations: number | null;
  };
  owner: {
      name: string | null;
      subascore: number;
  };
  with_virtual_inspection: boolean;
  inspector_is_online: boolean;
}

interface OfferGroup {
  _id: string | null;
  owner: string | null;
  date: string;
  time: string;
  created_at: string;
  url: string | null;
  group_navigation_url: string;
  offers_count: number;
  status: string | null;
  offers: Offer[];
  with_virtual_inspection: boolean;
  inspector_is_online: boolean;
}


function App() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [groups, setGroups] = useState<OfferGroup[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch('http://localhost:3000/offers')
      const data = await response.json()
      setOffers(data)
    }

    const fetchGroups = async () => {
      const response = await fetch('http://localhost:3000/groups')
      const data = await response.json()
      setGroups(data)
    }

    fetchOffers()
    fetchGroups()
  }, [])

  const filteredOffers = offers.filter(offer => offer.title?.includes(filter))
  const filteredGroups = groups.filter(group => group._id?.includes(filter))

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="Filter offers and groups" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
        />
      </div>
      <h1>Offers</h1>
      <ul>
        {filteredOffers.map(offer => (
          <li key={offer.id}>{offer.title}</li>
        ))}
      </ul>
      <h1>Groups</h1>
      <ul>
        {filteredGroups.map(group => (
          <li key={group._id}>{group._id}</li>
        ))}
      </ul>
    </>
  )
}

export default App
