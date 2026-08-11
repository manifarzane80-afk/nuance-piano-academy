```javascript
const CLOUD_NAME = "zksttsns";
const UPLOAD_PRESET = "nuance_upload";

export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("فایلی انتخاب نشده است.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary error:", data);

    throw new Error(
      data?.error?.message || "آپلود در Cloudinary انجام نشد."
    );
  }

  return data;
}
```
