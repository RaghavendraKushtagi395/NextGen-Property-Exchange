import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from './Contact';
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx'

export default function Listing() {

    SwiperCore.use([Navigation]);

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    const [copied, setCopied] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/listing/get/${params.listingId}`);

                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;

                }

                setListing(data);
                setLoading(false);
                setError(false);

            } catch (error) {
                setError(true);
                setLoading(false);

            }
        };

        fetchListing();

    }, [params.listingId]);

    //   console.log(loading);

    return (

        <main className="bg-gray-50">
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && (
                <p className="text-center my-7 text-2xl">Something went wrong!</p>
            )}
            {listing && !loading && !error && (
                <div className="max-w-6xl mx-auto p-5">
                    <Swiper navigation className="rounded-lg overflow-hidden shadow-md">
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[500px]"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="relative mt-5">
                        <div
                            className="absolute top-[-50px] right-5 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow-md cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                        >
                            <FaShare className="text-gray-700" />
                        </div>
                        {copied && (
                            <p className="absolute top-[-2px] right-5 bg-green-100 text-green-800 p-2 rounded-md shadow-md">
                                Link copied!
                            </p>
                        )}
                    </div>

                    <section className="bg-white shadow-md p-6 rounded-lg">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {listing.name}
                        </h1>
                        <p className="text-xl text-gray-600 mt-2">
                            ₹{' '}
                            {listing.offer
                                ? listing.discountPrice.toLocaleString('en-US')
                                : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' / month'}
                        </p>

                        <p className="flex items-center mt-4 text-gray-500">
                            <FaMapMarkerAlt className="text-green-600 mr-2" />
                            {listing.address}
                        </p>

                        <div className="flex gap-4 mt-4">

                            <span className={`py-1 px-3 rounded-lg ${listing.type === 'rent' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}`}>
                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </span>

                            {listing.offer && (
                                <span className="bg-green-500 text-white py-1 px-3 rounded-lg">
                                    ₹{+listing.regularPrice - +listing.discountPrice} Discount
                                </span>
                            )}
                        </div>


                        <p className="mt-6 text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Description: </strong>
                            {listing.description}
                        </p>

                        <ul className="flex gap-6 text-gray-800 mt-6">
                            <li className="flex items-center gap-2">
                                <FaBed className="text-xl" />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} Beds`
                                    : `${listing.bedrooms} Bed`}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaBath className="text-xl" />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} Baths`
                                    : `${listing.bathrooms} Bath`}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaParking className="text-xl" />
                                {listing.parking ? 'Parking Available' : 'No Parking'}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaChair className="text-xl" />
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>

                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button
                                onClick={() => setContact(true)}
                                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            >
                                Contact Landlord
                            </button>
                        )}

                        {contact && <Contact listing={listing} />}
                    </section>
                </div>
            )}

            <footer className="w-full mt-10">
                <img
                    src={footerImage}
                    className="w-full object-cover"
                    alt="Footer"
                />
                <Footer />
            </footer>
        </main>
    );
}