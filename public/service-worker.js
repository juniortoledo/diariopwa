self.addEventListener("install", (event) => {
  console.log("Installed SW");
});

self.addEventListener("activate", (event) => {
  console.log("Activated SW");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch:", event.request);
});

self.addEventListener("push", (event) => {
  // Double check the push event
  if (event.data.text() === "new-issue") {
    event.waitUntil(
      self.registration.showNotification("New issues", {
        body: "One or more tracked repositories have new issues or pull requests.",
      })
    );
  }
});