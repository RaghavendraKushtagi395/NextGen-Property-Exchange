import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/Listingitem.jsx';
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);


  return (
    <div>
   {/* Top section */}
   <div className="flex flex-col gap-6 py-16 px-6 lg:px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-900 font-bold text-3xl lg:text-5xl">
          Find your next <span className="text-indigo-600">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          NextGen Property Exchange is your gateway to finding ideal spaces. 
          Whether buying, renting, or investing, let us guide you.
        </p>
        <Link
          to={"/search"}
          className="text-sm lg:text-base text-blue-700 font-semibold hover:underline"
        >
          Start exploring now...
        </Link>
      </div>

      {/* Swiper Section */}
      <Swiper
        navigation
        loop={true}
        className="max-w-7xl mx-auto mt-10 shadow-lg rounded-xl overflow-hidden"
      >
        {offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[400px] md:h-[500px] rounded-xl"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

    {/* listing results for offer, sale and rent */}

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length > 0 && (
        <div className=''>
          <div className='my-3'>

            <h2 className='text-2xl font-bold text-slate-700'>Recent offers</h2>

            <Link className='text-sm font-semibold text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>

          <div className='flex flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

          </div>

        </div>
      )}

      {rentListings && rentListings.length > 0 && (
        <div className=''>
          <div className='my-3'>

            <h2 className='text-2xl font-bold text-slate-700'>Recent places for rent</h2>

            <Link className='text-sm font-semibold text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
          </div>

          <div className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

          </div>
        </div>
      )}

      {saleListings && saleListings.length > 0 && (
        <div className=''>
          <div className='my-3'>

            <h2 className='text-2xl font-bold text-slate-700'>Recent places for sale</h2>
            <Link className='text-sm font-semibold text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>

          </div>

          <div className='flex flex-wrap gap-4'>

            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

          </div>
        </div>
      )}

    </div>
    {/* Footer */}
    <footer className='w-full mt-10'>
        <img src={footerImage} className='w-full object-cover' alt='Footer'/> 
      </footer>

      <Footer/>

  </div>
  
  )
}
