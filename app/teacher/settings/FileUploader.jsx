"use client";

import { useState } from "react";
import { Upload, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";

export default function FileUploader({
  label = "آپلود فایل",
  accept = "*/*",
  onUploaded,
}) {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setError("");
    setResult(null);

    try {
      const uploaded = await uploadToCloudinary(file);

      setResult(uploaded);

      if (onUploaded) {
        onUploaded(uploaded);
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "آپلود فایل انجام نشد."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  return (
    <div className="npa-card p-4">

      <div className="text-sm font-bold mb-3">
        {label}
      </div>

      <label
        className="npa-btn-gold w-full justify-center cursor-pointer"
      >

        {uploading ? (
          <>
            <Loader2
              size={17}
              className="animate-spin"
            />

            در حال آپلود...
          </>
        ) : (
          <>
            <Upload size={17} />

            انتخاب فایل
          </>
        )}

        <input
          type="file"
          accept={accept}
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />

      </label>

      {result && (
        <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">

          <div className="flex items-center gap-2 text-green-400 text-xs font-bold">

            <CheckCircle2 size={16} />

            فایل با موفقیت آپلود شد
          </div>

          <div className="text-[10px] text-inkdim mt-2 break-all">
            {result.url}
          </div>

        </div>
      )}

      {error && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">

          <div className="flex items-center gap-2 text-red-400 text-xs font-bold">

            <XCircle size={16} />

            خطا در آپلود
          </div>

          <div className="text-[10px] mt-2">
            {error}
          </div>

        </div>
      )}

    </div>
  );
}