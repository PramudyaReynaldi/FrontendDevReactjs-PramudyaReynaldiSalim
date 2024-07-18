import React from "react";

const Navbar = ({ onPriceFilterChange, onOpenNowFilterChange, onCityFilterChange, data, clearFilters }) => {
    const uniqueCities = [...new Set(data.map((restaurant) => restaurant.city))];

    return (
        <nav className="container mx-auto flex items-center gap-3 justify-between border-y border-y-slate-300 lg:py-4 lg:px-12 px-5 my-10 overflow-auto text-nowrap">
            <div className="flex items-center space-x-4">
                <span>Filter by:</span>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center lg:border-b border-b-slate-300 gap-2">
                        <input
                            type="checkbox"
                            id="openNow"
                            onChange={(e) =>
                                onOpenNowFilterChange(e.target.checked)
                            }
                        />
                        <label htmlFor="openNow" className="text-slate-500">
                            Open Now
                        </label>
                    </div>
                    <select
                        name="Price"
                        placeholder="Price"
                        className="w-auto lg:w-[200px] lg:border-b border-b-slate-300 focus-visible:outline-none"
                        onChange={(e) => onPriceFilterChange(e.target.value)}
                    >
                        <option value="All">All Prices</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                    </select>
                    <select
                        name="City"
                        className="w-auto lg:w-[200px] lg:border-b border-b-slate-300 focus-visible:outline-none"
                        onChange={(e) => onCityFilterChange(e.target.value)}
                    >
                        <option value="All">All Cities</option>
                        {uniqueCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    className="py-2 px-6 border border-slate-300 text-sm text-slate-300 hover:bg-blue-950 hover:text-white duration-200"
                    onClick={clearFilters}
                >
                    CLEAR ALL
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
