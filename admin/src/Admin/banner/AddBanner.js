import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddBanner() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [position, setPosition] = useState("home");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subtitle || !buttonText || !buttonLink || !position || !image) {
      alert("Please Enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("buttonText", buttonText);
    formData.append("buttonLink", buttonLink);
    formData.append("position", position);
    formData.append("image", image);

    try {
      await API.post("/banner/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Banner Added");
      navigate("/all-banner");
    } catch (error) {
      console.log(error);
      alert("Error adding banner");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border border-pink-800 w-[480px] h-[520px] flex flex-col items-center gap-[40px] rounded-[10px] mt-[30px]">
        <h2 className="text-2xl font-semibold text-pink-800 mt-[30px]">Add Banner</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px]">
          <input
            type="text"
            placeholder="Title"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subtitle"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Button Text"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
          />

          <input
            type="text"
            placeholder="Button Link"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
          />

          <select
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="home">Home Top Banner</option>
            <option value="middle">Middle Banner</option>
            <option value="offer">Offer Banner</option>
            <option value="category">Category Page Banner</option>
          </select>

          <input
            type="file"
            className="border border-pink-800 p-2 w-[420px] bg-pink-50 rounded-[10px] text-pink-800"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBanner;
