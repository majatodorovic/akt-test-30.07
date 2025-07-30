"use client";

import { icons } from "@/_lib/icons";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";
import { toast } from "react-toastify";
import Image from "next/image";

export const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  errors,
  data,
  id,
  required,
  options,
  fill,
  className,
}) => {
  switch (type) {
    case "email":
    case "text":
    case "password":
      return (
        <TextInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          type={type}
          value={value}
          errors={errors}
          required={required}
          className={className}
        />
      );
    case "select":
      return (
        <SelectInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          value={value}
          errors={errors}
          options={options}
          required={required}
          fill={fill}
          className={className}
        />
      );
    case "date":
      return (
        <DateInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          value={value}
          errors={errors}
          required={required}
          className={className}
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          value={value}
          errors={errors}
          required={required}
          className={className}
        />
      );
    case "textarea":
      return (
        <TextareaInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          value={value}
          errors={errors}
          required={required}
          className={className}
        />
      );
    case "rating":
      return (
        <RatingInput
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          required={required}
          errors={errors}
          className={className}
          options={options}
        />
      );

    case "file":
      return (
        <FileUploadInput
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          data={data}
          value={value}
          errors={errors}
          required={required}
          fileType={name || "all"}
          className={className}
        />
      );
  }
};

export const FileUploadInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  errors,
  required,
  fileType,
  className,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (
      fileType.includes("images") &&
      data[fileType]?.length == 0 &&
      uploadedFiles?.length > 0
    ) {
      setUploadedFiles([]);
    }
    if (
      fileType.includes("videos") &&
      data[fileType]?.length == 0 &&
      uploadedFiles?.length > 0
    ) {
      setUploadedFiles([]);
    }
  }, [data]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check file type
    const isImage =
      fileType.includes("images") && file.type.startsWith("image/");
    const isVideo =
      fileType.includes("videos") && file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.warning(`Invalid file type. Please upload a ${fileType}.`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
      });
      event.target.value = null;
      return;
    }

    setUploadedFiles((prev) => [...prev, file]);
    onChange({ target: { name, value: [...uploadedFiles, file] } });

    event.target.value = null;
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter(
      (_, index) => index !== indexToRemove,
    );
    setUploadedFiles(updatedFiles);
    onChange({ target: { name, value: updatedFiles } });
  };

  return (
    <div className={`mb-5 max-sm:col-span-full ${className ? className : ""}`}>
      {/* <label
        htmlFor={name}
        className={`block text-sm font-normal text-gray-500 mb-2`}
      >
        {placeholder}
        {required && <span className={`text-xs text-red-500`}>*</span>}
      </label> */}
      <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <span className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md text-sm">
              {placeholder}
            </span>
          </div>
          <input
            type="file"
            name={name}
            id={id}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      {uploadedFiles?.length > 0 && (
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="mb-2 relative">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded preview"
                  className="max-w-full h-auto border rounded-md"
                />
              ) : (
                <video
                  controls
                  src={URL.createObjectURL(file)}
                  className="max-w-full h-auto border rounded-md"
                />
              )}

              <Image
                title="Remove file"
                src={"/icons/cancel.png"}
                alt="cancel"
                width={20}
                height={20}
                onClick={() => handleRemoveFile(index)}
                className="absolute cursor-pointer top-1 right-1 p-1 rounded"
              />
            </div>
          ))}
        </div>
      )}

      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          This field is required.
        </div>
      )}
    </div>
  );
};

export const RatingInput = ({
  name,
  errors,
  onChange,
  value,
  required,
  className,
  options = [1, 2, 3, 4, 5],
}) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  return (
    <div className={`mb-5 max-sm:col-span-full ${className ? className : ""}`}>
      <div className="flex items-center">
        <label
          htmlFor={name}
          className={`block text-sm font-normal text-gray-500 mr-2`}
        >
          Rating
          {required && <span className={`text-xs text-red-500`}> *</span>}
        </label>
        <div className="flex">
          {options.map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer px-[2px] ${
                (hoveredValue !== null ? hoveredValue : value) >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => {
                if (!value || star > value) {
                  setHoveredValue(star);
                }
              }}
              onMouseLeave={() => setHoveredValue(null)}
              onClick={() => onChange({ target: { name, value: star } })}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          Ovo polje je obavezno.
        </div>
      )}
    </div>
  );
};

export const TextInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  value,
  errors,
  type,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`mb-5 max-sm:col-span-full`}>
      <label
        htmlFor={name}
        className={`block text-sm font-normal text-gray-500`}
      >
        {placeholder}
        {required && <span className={`text-xs text-red-500`}>*</span>}
      </label>
      <div className={`relative`}>
        <input
          value={value ?? data?.[name] ?? ""}
          name={name}
          onChange={(e) => onChange(e)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={id}
          className={`mt-1 block w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-croonus-1 sm:text-sm focus:border-transparent text-base ${
            (errors ?? [])?.includes(name)
              ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
              : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-2 top-2`}
            title={`Prikaži lozinku`}
          >
            {showPassword ? icons["eyeopen"] : icons["eye_closed"]}
          </button>
        )}
        {required && errors?.includes(name) && (
          <div className={`text-red-500 text-xs mt-1`}>
            Ovo polje je obavezno.
          </div>
        )}
      </div>
    </div>
  );
};

export const SelectInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  value,
  errors,
  options,
  required,
  fill,
  className,
}) => {
  const { data: opt } = useQuery({
    queryKey: ["options", name, fill],
    queryFn: async () => {
      return await get(`${fill}`)?.then((res) => res?.payload);
    },
    enabled: fill?.length > 0,
  });
  return (
    <div className={`mb-5 max-sm:col-span-full ${className}`}>
      <label
        htmlFor={name}
        className={`block text-sm font-normal text-gray-500`}
      >
        {placeholder}
        {required && <span className={`text-xs text-red-500`}>*</span>}
      </label>
      <select
        value={value ?? data?.[name]}
        name={name}
        onChange={(e) => onChange(e)}
        id={id}
        className={`mt-1 block w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-croonus-1 sm:text-sm focus:border-transparent text-base ${
          (errors ?? [])?.includes(name)
            ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
            : ""
        }`}
      >
        <option value={""}>Izaberite...</option>
        {(opt ?? options ?? []).map((option) => (
          <option key={option?.id} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </select>
      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          Ovo polje je obavezno.
        </div>
      )}
    </div>
  );
};

export const DateInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  value,
  errors,
  required,
}) => {
  return (
    <div className={`mb-5 max-sm:col-span-full`}>
      <label
        htmlFor={name}
        className={`block text-sm font-normal text-gray-500`}
      >
        {placeholder}
        {required && <span className={`text-xs text-red-500`}>*</span>}
      </label>
      <input
        value={value ?? data?.[name]}
        name={name}
        onChange={(e) => onChange(e)}
        type={"date"}
        id={id}
        className={`mt-1 block w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-croonus-1 sm:text-sm focus:border-transparent text-base ${
          (errors ?? [])?.includes(name)
            ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
            : ""
        }`}
      />
      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          Ovo polje je obavezno.
        </div>
      )}
    </div>
  );
};

export const CheckboxInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  value,
  errors,
  required,
  className,
}) => {
  return (
    <div className={`mb-5 max-sm:col-span-full ${className}`}>
      <div className={`flex items-center flex-row-reverse justify-end gap-2`}>
        <label
          htmlFor={id}
          className={`block text-sm font-normal text-gray-500`}
        >
          {placeholder}
          {required && <span className={`text-xs text-red-500`}>*</span>}
        </label>
        <input
          checked={value ?? data?.[name]}
          value={value ?? data?.[name]}
          name={name}
          onChange={(e) => onChange(e)}
          type={"checkbox"}
          id={id}
          className={`h-5 w-5 block border border-gray-200 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-croonus-1 sm:text-sm focus:border-transparent text-base text-green-500 ${
            (errors ?? [])?.includes(name)
              ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
              : ""
          }`}
        />
      </div>
      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          Ovo polje je obavezno.
        </div>
      )}
    </div>
  );
};

export const TextareaInput = ({
  name,
  id,
  onChange,
  placeholder,
  data,
  value,
  errors,
  required,
}) => {
  return (
    <div className={`mb-5 col-span-full`}>
      <label
        htmlFor={name}
        className={`block text-sm font-normal text-gray-500`}
      >
        {placeholder}
        {required && <span className={`text-xs text-red-500`}>*</span>}
      </label>
      <textarea
        value={value ?? data?.[name]}
        name={name}
        onChange={(e) => onChange(e)}
        id={id}
        className={`mt-1 block w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-croonus-1 sm:text-sm focus:border-transparent text-base ${
          (errors ?? [])?.includes(name)
            ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
            : ""
        }`}
      />
      {required && errors?.includes(name) && (
        <div className={`text-red-500 text-xs mt-1`}>
          Ovo polje je obavezno.
        </div>
      )}
    </div>
  );
};
