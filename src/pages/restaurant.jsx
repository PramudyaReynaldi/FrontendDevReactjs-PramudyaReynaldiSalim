import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurantsAsync } from "../features/restaurants/restaurantsSlice";
import RestaurantCard from "../components/Card";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Meta from "../meta/Meta";
import { getPriceRange, isOpenNow } from "../utils/utils";

const RestaurantPage = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [priceFilter, setPriceFilter] = useState("All");
    const [openNowFilter, setOpenNowFilter] = useState(false);
    const [cityFilter, setCityFilter] = useState("All");
    const [visibleCount, setVisibleCount] = useState(8);

    const dispatch = useDispatch();

    const restaurants = useSelector((state) => state.restaurants.restaurants);
    const status = useSelector((state) => state.restaurants.status);

    const visibleRestaurants = filteredData.slice(0, visibleCount);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchRestaurantsAsync());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (priceFilter === "All" && !openNowFilter && cityFilter === "All") {
            setFilteredData(restaurants);
        } else {
            setFilteredData(
                restaurants.filter((restaurant) => {
                    const matchesPrice = priceFilter === "All" || getPriceRange(restaurant.rating) === priceFilter;
                    const matchesOpenNow = !openNowFilter || isOpenNow(restaurant);
                    const matchesCity = cityFilter === "All" || restaurant.city === cityFilter;
                    return matchesPrice && matchesOpenNow && matchesCity;
                })
            );
        }
    }, [priceFilter, openNowFilter, cityFilter, restaurants]);

    const handlePriceFilterChange = (selectedPrice) => {
        setPriceFilter(selectedPrice);
    };

    const handleOpenNowChange = (isChecked) => {
        setOpenNowFilter(isChecked);
    };

    const handleCityFilterChange = (selectedCity) => {
        setCityFilter(selectedCity);
    };

    const loadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    const clearFilters = () => {
        setPriceFilter("All");
        setOpenNowFilter(false);
        setCityFilter("All");
    };

    return (
        <>
            <Meta
                title="Restaurant"
                description="Ini adalah Restoran terbaik di Indonesia"
            />

            <Navbar
                onPriceFilterChange={handlePriceFilterChange}
                onOpenNowFilterChange={handleOpenNowChange}
                onCityFilterChange={handleCityFilterChange}
                clearFilters={clearFilters}
                data={restaurants}
            />
            
            <section className="container lg:px-12 mx-auto">
                <h2 className="text-2xl px-3">All Restaurants</h2>
                <div className="flex flex-wrap items-center w-full">
                    {status === "loading" ? (
                        <Loading />
                    ) : (
                        visibleRestaurants.length === 0 ? (
                            <p className="flex justify-center items-center h-lvh text-center w-full">No restaurant found</p>
                        ) : (
                            visibleRestaurants.map((restaurant) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    data={restaurant}
                                />
                            ))
                        )
                    )}
                </div>

                <div className="flex items-center justify-center my-5">
                    {filteredData.length > visibleCount && (
                        <button
                            className="py-2 px-28 border border-slate-400 hover:bg-blue-950 hover:text-white text-blue-950 duration-200"
                            onClick={loadMore}
                        >
                            Load More
                        </button>
                    )}
                </div>
            </section>
        </>
    );
};

export default RestaurantPage;

