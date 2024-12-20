chrome.tabs.onUpdated.addListener(async () => {
    try {
      const tabs = await chrome.tabs.query({}); 
      const imageUrls = tabs
        .filter(tab => tab.url && tab.url.match(/^https?:\/\/.*\.(jpg|jpeg)$/)) 
        .map(tab => tab.url); 
  
    
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ imageUrls });
      } else {
        console.error("chrome.storage.local is not available");
      }
    } catch (error) {
      console.error("Error in background script:", error);
    }
  });
  