const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
  try {
    const result = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: "image.jpg",
    });

    return result;
  } catch (error) {
    console.log("ImageKit Error:", error);
    throw error;
  }
}

module.exports = uploadFile;
