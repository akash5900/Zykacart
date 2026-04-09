import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [position, setPosition] = useState("home");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await API.get("/banner/all");
        const banner = res.data.banners.find((b) => b._id === id);

        if (banner) {
          setTitle(banner.title);
          setSubtitle(banner.subtitle);
          setButtonText(banner.buttonText);
          setButtonLink(banner.buttonLink);
          setPosition(banner.position);
        }
      } catch (error) {
        console.log("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("buttonText", buttonText);
    formData.append("buttonLink", buttonLink);
    formData.append("position", position);
    if (image) formData.append("image", image);

    try {
      await API.put("/banner/update/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Banner Updated");
      navigate("/all-banner");
    } catch (error) {
      console.log("Update error:", error);
      alert("Error updating banner");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Banner</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          className="border p-2 w-full"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
        />

        <input
          className="border p-2 w-full"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Button Text"
        />

        <input
          className="border p-2 w-full"
          value={buttonLink}
          onChange={(e) => setButtonLink(e.target.value)}
          placeholder="Button Link"
        />

        <select
          className="border p-2 w-full"
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
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-green-500 text-white px-4 py-2">
          Update Banner
        </button>
      </form>
    </div>
  );
}

export default EditBanner;