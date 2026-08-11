export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("فایلی انتخاب نشده است.");
  }

  const cloudName = "zksttsns";
  const uploadPreset = "nuance_upload";

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary upload error:", data);

    throw new Error(
      data?.error?.message ||
        "آپلود فایل انجام نشد."
    );
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
    format: data.format,
    originalFilename: data.original_filename,
    bytes: data.bytes,
  };
}