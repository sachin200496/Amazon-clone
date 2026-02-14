export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("image_upload", selectedFile);
        
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.json();
        return data.secure_url;
}