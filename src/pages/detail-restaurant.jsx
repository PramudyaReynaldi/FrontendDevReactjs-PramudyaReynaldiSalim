import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurantDetailAsync, clearDetailState } from "../features/restaurants/restaurantsSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import Loading from "../components/Loading";
import { getPriceRange, isOpenNow } from "../utils/utils";
import Meta from "../meta/Meta";

const DetailRestaurantPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const restaurantDetail = useSelector((state) => state.restaurants.detail);
    const status = useSelector((state) => state.restaurants.detailStatus);
    const error = useSelector((state) => state.restaurants.detailError);

    useEffect(() => {
        dispatch(fetchRestaurantDetailAsync(id));
        return () => {
            dispatch(clearDetailState());
        };
    }, [dispatch, id]);

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (!restaurantDetail) {
        return null;
    }

    let star = [];

    for (let i = 0; i < 5; i++) {
        if (i < restaurantDetail.rating) {
            star.push(<AiFillStar />);
        } else { 
            star.push(<AiOutlineStar />);
        }
    }

    const priceRange = getPriceRange(restaurantDetail.rating);
    const isOpen = isOpenNow(restaurantDetail);


    return (
        <>
            <Meta
                title={`Restaurant | ${restaurantDetail.name}`}
                description={restaurantDetail.description}
            />

            <section className="text-gray-600 body-font overflow-hidden">
                <button className="m-4" onClick={() => navigate(-1)}>
                    <IoCaretBackCircleSharp size={40} />
                </button>
                <div className="container px-5 lg:py-24 py-10  mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            src={`https://restaurant-api.dicoding.dev/images/large/${restaurantDetail.pictureId}`}
                            alt={restaurantDetail.name}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {restaurantDetail.city}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {restaurantDetail.name}
                            </h1>
                            <div className="flex mb-4">
                                <div className="flex items-center">
                                    {star.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))}
                                    <span className="text-gray-600 ml-3">
                                        {restaurantDetail.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="leading-relaxed">
                                {restaurantDetail.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="title-font font-medium text-2xl text-gray-900">{priceRange}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`${isOpen ? "bg-green-400" : "bg-red-500"} w-3 h-3 rounded-full`}></span>
                                    <p className="text-xs text-slate-600 uppercase">{isOpen ? "open now" : "closed"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailRestaurantPage;
