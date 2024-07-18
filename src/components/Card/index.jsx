import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getPriceRange, isOpenNow } from "../../utils/utils";

const RestaurantCard = ({ data }) => {
    const navigate = useNavigate();

    const isOpen = isOpenNow(data);
    const priceRange = getPriceRange(data.rating);

    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < data.rating) {
            stars.push(<AiFillStar />);
        } else {
            stars.push(<AiOutlineStar />);
        }
    }

    return (
        <div className="card w-full md:w-1/2 lg:w-1/4 p-3">
            <div className="w-full h-60 overflow-hidden">
                <img
                    src={`https://restaurant-api.dicoding.dev/images/small/${data.pictureId}`}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="font-semibold text-lg mt-3">{data.name}</h2>
            <div className="flex mt-2 items-center justify-between">
                <div className="flex">
                    {stars.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                <span className="text-gray-600 text-sm font-thin">{data.rating}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-light text-slate-500 uppercase">
                    {data.city} - {priceRange}
                </p>
                <div className="inline-flex space-x-1 items-center">
                    <span
                        className={`${
                            isOpen ? "bg-green-400" : "bg-red-500"
                        } w-3 h-3 rounded-full`}
                    ></span>
                    <p className="text-xs text-slate-600 uppercase">
                        {isOpen ? "open now" : "closed"}
                    </p>
                </div>
            </div>
            <button
                className="py-2 mt-2 w-full border border-slate-400 bg-blue-950 hover:bg-blue-900 text-white duration-200"
                onClick={() => navigate(`/detail-restaurant/${data.id}`)}
            >
                LEARN MORE
            </button>
        </div>
    );
};

export default RestaurantCard;
