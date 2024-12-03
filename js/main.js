(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotAnnotation = document.querySelectorAll(".HotspotAnnotation");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const errorContainer = document.querySelector("#error-container");

  // Loader
  const loader = document.querySelector("#loader");

  // Material
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  //Fnctions
  function loadInfoBoxes() {
    //AJAX Call
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          // Image
          const thumbElement = document.createElement("img");
          thumbElement.src = `images/earbud${index + 1}.jpg`;
          thumbElement.alt = infoBox.heading;

          selected.appendChild(thumbElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      // Error Message
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops, something went wrong. Please check your internet connection or try again later.";

        hotspotAnnotation.forEach((annotation) => {
          annotation.appendChild(errorMessage.cloneNode(true));
        });
      });
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materialsxxx")
      .then((response) => response.json())
      .then((materialListData) => {
        materialListData.forEach((material) => {
          // Clone the template
          const clone = materialTemplate.content.cloneNode(true);

          // Populate template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const paragraphDescription = clone.querySelector(
            ".material-description"
          );
          paragraphDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        loader.classList.toggle("hidden");
      })

      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops, something went wrong. Please check your internet connection or try again later.";

        errorContainer.appendChild(errorMessage);
      });
  }
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
