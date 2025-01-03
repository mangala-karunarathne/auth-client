import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Uploading is " + progress + "% done");
        console.log("imagePercent:", imagePercent);
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error("Upload failed:", error.code, error.message);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error.message);
          });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading Image (File size should be less tha 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`Uploading : ${imagePercent} % `}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">
              Image Uploaded Successfully...
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3
        "
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3
        "
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3
        "
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75
          "
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
