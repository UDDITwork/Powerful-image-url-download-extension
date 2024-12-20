document.addEventListener("DOMContentLoaded", async () => {
  const imageList = document.getElementById("image-list");
  const downloadButton = document.getElementById("download");

 
  const { imageUrls } = await chrome.storage.local.get("imageUrls");

  if (imageUrls && imageUrls.length > 0) {
    imageUrls.forEach(url => {
      const p = document.createElement("p");
      p.textContent = url;
      imageList.appendChild(p);
    });
  } else {
    imageList.textContent = "No image URLs found.";
  }

 
  downloadButton.addEventListener("click", async () => {
    if (imageUrls && imageUrls.length > 0) {
      for (const url of imageUrls) {
        chrome.downloads.download({
          url: url,
          filename: `image_${Date.now()}.jpg`
        });
      }
    } else {
      alert("No image URLs to download.");
    }
  });
});
