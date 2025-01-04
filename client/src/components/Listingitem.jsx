import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';


export default function ListingItem({ listing }) {

  return (
    <div className='bg-white shadow-lg hover:shadow-xl duration-300 rounded-xl overflow-hidden w-full sm:w-[350px] hover:ring-2 hover:ring-blue-400 transition'>
  <Link to={`/listing/${listing._id}`}>
    <img
      src={listing.imageUrls[0]}
      alt='listing cover'
      className='h-[320px] sm:h-[220px] w-full object-cover rounded-t-xl hover:scale-105 transform transition-transform duration-300'
    />

    <div className='p-4 flex flex-col gap-3'>
      <p className='truncate text-xl font-semibold text-gray-800'>
        {listing.name}
      </p>

      <div className='flex items-center text-gray-500 gap-2'>
        <MdLocationOn className='h-5 w-5 text-green-600' />
        <p className='truncate text-sm'>{listing.address}</p>
      </div>

      <p className='text-sm text-gray-600 line-clamp-3'>
        {listing.description}
      </p>

      <p className='text-lg font-bold text-green-700 mt-2'>
        ₹{listing.offer
          ? listing.discountPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}
        {listing.type === 'rent' && ' / month'}
      </p>

      <div className='flex items-center text-gray-700 gap-6 mt-2'>
        <span className='text-xs font-medium bg-gray-100 py-1 px-2 rounded-lg'>
          {listing.bedrooms > 1
            ? `${listing.bedrooms} Beds`
            : `${listing.bedrooms} Bed`}
        </span>
        <span className='text-xs font-medium bg-gray-100 py-1 px-2 rounded-lg'>
          {listing.bathrooms > 1
            ? `${listing.bathrooms} Baths`
            : `${listing.bathrooms} Bath`}
        </span>
      </div>
    </div>
  </Link>
</div>

  );
}