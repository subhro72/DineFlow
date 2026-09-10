import api from "./api";

export const getMenuItems = async () => {
    const response = await api.get("/menu-items");
    return response.data;
};

export const getMenuItemById = async (id) => {
    const response = await api.get(`/menu-items/${id}`);
    return response.data;
};