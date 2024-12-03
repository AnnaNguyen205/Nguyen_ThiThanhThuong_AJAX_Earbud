(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  //functions
  function loadInfoBoxes() {
    //make AJAX call here

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        console.log(infoBoxes);

        // infoBoxes.forEach((infoBox, index) => {
        //   let selected = document.querySelector(`#hotspot-${index + 1}`);

        //   const titleElement = document.createElement("h2");
        //   titleElement.textContent = infoBox.title;

        //   const textElement = document.createElement("p");
        //   textElement.textContent = infoBox.text;

        //   selected.appendChild(titleElement);
        //   selected.appendChild(textElement);
        // });
      })
      .catch();

    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement("h2");
      titleElement.textContent = infoBox.title;

      const textElement = document.createElement("p");
      textElement.textContent = infoBox.text;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materials) => {
        console.log(materials);

        materials.forEach((material) => {
          // clone the template
          const clone = materialTemplate.content.cloneNode(true);
          // populate with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch();
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
