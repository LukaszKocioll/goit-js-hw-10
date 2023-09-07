import axios from "axios";
import SlimSelect from "slim-select";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_BFq3gz6kMjXMD7VdiarPlTCN44RMVR0q7MmdASmvPdIllihmcESuSVA6bk3PwX9h";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

new SlimSelect({
  select: '#single'
})

function fetchBreeds() {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  error.style.display = "none";
  catInfo.innerHTML = "";

  axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      const breeds = response.data;
      breedSelect.innerHTML = "";

      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      loader.style.display = "none";
      breedSelect.style.display = "block";
    })
    .catch((err) => {
      loader.style.display = "none";
      error.style.display = "block";
      console.error(err);
    });
}

function fetchCatByBreed(breedId) {
  loader.style.display = "block";
  error.style.display = "none";

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      const catImage = document.createElement("img");
      catImage.src = catData.url;

      const catName = document.createElement("p");
      catName.textContent = `Breed: ${catData.breeds[0].name}`;

      const catDescription = document.createElement("p");
      catDescription.textContent = `Description: ${catData.breeds[0].description}`;

      const catTemperament = document.createElement("p");
      catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

      catInfo.innerHTML = "";
      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      loader.style.display = "none";
    })
    .catch((err) => {
      loader.style.display = "none";
      error.style.display = "block";
      console.error(err);
    });
}

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();
