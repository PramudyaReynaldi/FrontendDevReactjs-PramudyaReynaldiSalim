// Data distrik untuk menentukan jam buka restoran
export const dataDistrict = {
    Balikpapan: "Balikpapan",
    Gorontalo: "Gorontalo",
    Surabaya: "Surabaya",
};

// Fungsi untuk memeriksa apakah restoran buka sekarang
export const isOpenNow = (data) => {
    const currentTime = new Date().getHours();
    const isOpen24Hours = Object.keys(dataDistrict).includes(data.city);

    return isOpen24Hours || (currentTime > 9 && currentTime < 21);
};

// Fungsi untuk menentukan rentang harga berdasarkan rating
export const getPriceRange = (rating) => {
    if (rating < 2) return "$";
    if (rating < 3) return "$$";
    if (rating < 4) return "$$$";
    return "$$$$";
};