const { v2: cloudinary } = require("cloudinary");
const env = require("../config/env");

cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
});


const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "dineflow/menu-items",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error details:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};

const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            publicId,
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
const getPublicIdFromUrl = (imageUrl) => {
    const parts = imageUrl.split("/upload/");

    if (parts.length !== 2) {
        return null;
    }

    const publicIdWithExtension = parts[1]
        .split("/")
        .slice(1)
        .join("/");

    return publicIdWithExtension.replace(/\.[^/.]+$/, "");
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
    getPublicIdFromUrl
};

