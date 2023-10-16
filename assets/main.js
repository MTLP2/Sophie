/**
 * Fonction "projectShow" qui permet d'afficher les projets sur la homepage.
 * @param {Array} tab Tableau des projets
 */

const body = document.querySelector("body");

async function projectShow(){

  //***************************************
  //********** Connexion à l'API **********
  //***************************************
  const gallery = document.querySelector(".gallery");
  const response = await fetch(`http://localhost:5678/api/works/`);
  const data = await response.json();
  console.log(data);
//***************************************

  let galleryContent = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    galleryContent +=
    `
    <figure>
    <img src="${data[i].imageUrl}" alt="${data[i].title}">
    <figcaption>${data[i].title}</figcaption>
    </figure>`;
  }
  gallery.innerHTML = galleryContent;
}


async function projectShowFilter(data){

  //***************************************
  //********** Connexion à l'API **********
  //***************************************
  const gallery = document.querySelector(".gallery");
  console.log(data);
//***************************************

  let galleryContent = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    galleryContent +=
    `
    <figure>
    <img src="${data[i].imageUrl}" alt="${data[i].title}">
    <figcaption>${data[i].title}</figcaption>
    </figure>`;
  }
  gallery.innerHTML = galleryContent;
}
//---------------------------------------

//***************************************
//********** Création du contenu Edit ***
//***************************************
document.addEventListener("DOMContentLoaded", function() {
  // Votre code ici sera exécuté après que le DOM soit complètement chargé
  let acces = localStorage.getItem("accessToken");
  console.log(acces);

  if (acces == null){
    console.log('ok');
    document.querySelector('.modeEdition').innerHTML = `<div></div>`;
    document.querySelector('.titleEdit').innerHTML = `<div></div>`;
    document.querySelector('header nav ul').innerHTML =`
    <li><a href="index.html#portfolio">Projets</a></li>
		<li><a href="index.html#contact">Contact</a></li>
		<li><a href="./login.html">Login</a></li>
		<li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `
  }

  else if (acces = "true") {
    document.querySelector('.modeEdition').innerHTML = 
    `
    <div class="edit-mode">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>Mode édition</p>
    </div>
    `;
    document.querySelector('.titleEdit').innerHTML = 
    `
    <h2>Mes Projets</h2>
			<div class="edit">
				<div id="editPortfolio">
					<i class="fa-regular fa-pen-to-square"></i>
					<p>modifier</p>
				</div>
			</div>
    `
    document.querySelector('header nav ul').innerHTML =`
    <li><a href="index.html#portfolio">Projets</a></li>
		<li><a href="index.html#contact">Contact</a></li>
		<li><a href="index.html" class="logout">Logout</a></li>
		<li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `
  }
  
  document.querySelector(".logout").addEventListener('click', (e) =>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('accessToken');
    location.reload();
    
  })
  document.querySelector("#editPortfolio").addEventListener('click', (e) =>{
    showModal1()
    body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  })
});


//***************************************
//********** Création de modal 1 ********
//***************************************
function showModal1() {

  document.querySelector('.edit-1').innerHTML = 
  `
  <i class="fa-solid fa-xmark" id="closeEdit-1"></i>
  <h2>Galerie photo</h2>
  <div class="img-area">
    
  </div>
  <div id="btn-area1">
    <button>Ajouter une photo</button>
  </div>
  `
  for (let i = 0; i < data.length; i++) {
    const img = data[i].imageUrl;
    document.querySelector(".img-area").innerHTML += 
    `
    <div class="img-area-display">
      <img src="${img}" alt="">
      <i id = "${i}" class="fa-solid fa-trash-can trash"></i>
    </div>
    `
    // Inspecter tous les éléments <i> ajoutés
    const allIcons = document.querySelectorAll('.img-area-display i');
    allIcons.forEach((icon, index) => {
        icon.addEventListener("click", ()=>{
        const Token = localStorage.getItem("userToken");
        fetch(`http://localhost:5678/api/works/${data[index].id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${Token}`
          },
        })
        .then(data => {
          body.style.backgroundColor = "transparent";
          projectShow();
          document.querySelector(".edit-1").innerHTML = "";
        })
        .catch(error => {
          console.error('Erreur:', error);
        });


      })
  });

}

  /**Fermeture de la modal au click de la croix* */

  
  document.querySelector('.edit-1').style.display = "block"
  
  /**Fermeture de la modal au click de la croix* */
  document.querySelector("#closeEdit-1").addEventListener("click", ()=>{
    document.querySelector(".edit-1").innerHTML = "";
    body.style.backgroundColor = "transparent";
  })

  document.querySelector('#btn-area1').addEventListener("click", () => {
    document.querySelector(".edit-1").innerHTML = "";
    showModal2()
  })
}



//***************************************
//********** Création de modal 2 ********
//***************************************

async function showModal2() {
  


  document.querySelector('.edit-2').innerHTML = 
  `
  <form class="edit-2">
    <div class="edit-2-icons">
      <i class="fa-solid fa-xmark" id="closeEdit-2"></i>
      <i class="fa-solid fa-arrow-left" id="returnEdit-1"></i>
    </div>
    <h2>Ajout photo</h2>
    <div class="upload-box">
      <input type="file" id="imageUpload" accept="image/*" required>
      <label for="imageUpload" class="upload-label">
      <div class="upload-background"></div>
    </div>
    <label for="edit2Title">Titre</label>
    <input type="text" id="edit2Title" required>

    <label for="edit2Categorie">Catégorie</label>
    <select id="categorySelect" name="categories" required>
      <option value="categorie">Choisissez une catégorie</option>
      <option value="1">Objets</option>
      <option value="2">Appartements</option>
      <option value="3">Hôtels & Restaurants</option>
    </select>
    <div id="btn-area2">
      <button>Valider</button>
    </div>
  </form>
  `
  /**Retour à la modale 1**/
  document.querySelector("#returnEdit-1").addEventListener("click", () =>{
    document.querySelector(".edit-2").innerHTML = "";
    showModal1();
  })
  
  const imageUpload = document.getElementById('imageUpload');
  /**Modification de l'image dans l'input file**/
  imageUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const uploadBackground = document.querySelector('.upload-background');
            uploadBackground.style.backgroundImage = `url(${e.target.result})`;
          };
          reader.readAsDataURL(file);
      }
  });

  document.querySelector('.edit-2').addEventListener('submit', (e) =>{
    e.preventDefault();

    let titleInput = document.querySelector('#edit2Title');
    let categoryInput = document.querySelector('#categorySelect').value;
    let file = imageUpload.files[0];
    const Token = localStorage.getItem("userToken");
    console.log(titleInput.value);
    console.log(typeof categoryInput);
    const formData = new FormData();
    console.log(file);
    formData.append('image', file);
    formData.append('title', titleInput.value); console.log();
    formData.append('category', categoryInput);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${Token}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload();

    })
    .catch(error => {
      console.error('Erreur:', error);
    });
});


  /**Fermeture de la modal au click de la croix**/
  document.querySelector("#closeEdit-2").addEventListener("click", ()=>{
    document.querySelector(".edit-2").innerHTML = ""
    body.style.backgroundColor = "transparent";
  })

  document.querySelector('.edit-2').style.display = "block"

};



const response = await fetch(`http://localhost:5678/api/works/`);
const data = await response.json();




//***************************************


projectShow();
const gallery = document.querySelector(".gallery");

//Annuler les filtres de la gallerie
document.querySelector(".filterAll").addEventListener("click", () =>{
  gallery.innerHTML = "";
  projectShow();
});
//Affiche uniquement la catégorie "objet" dans la gallerie
document.querySelector(".filterObjects").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json(); 
  const filterObject = newdata.filter(elt => elt.category.name === "Objets");
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});
//Affiche uniquement la catégorie "appartements" dans la gallerie
document.querySelector(".filterAppartments").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json(); 
  const filterObject = newdata.filter(elt => elt.category.name === "Appartements");
  
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});
//Affiche uniquement la catégorie "hotel & restaurants" dans la gallerie
document.querySelector(".filterHotelsAndRestaurants").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json(); 
  const filterObject = newdata.filter(elt => elt.category.name === "Hotels & restaurants");
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});




//***************************************
//********** REGEX CONTACT FORM *********
//***************************************

const contactMsg = document.querySelector(".contactMsg");



document.querySelector(".contactForm").addEventListener("submit", () =>{
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (!regex.test(email)) {
    contactMsg.textContent = "Veuillez entrer une adresse e-mail valide.";
    event.preventDefault(); // Empêche la soumission du formulaire
    console.log("pas ok");
    emailInput.style.border = "2px solid red";
  } else {
    // Reset le style et le message d'erreur si l'email est valide
    emailInput.style.border = "none"; // ou autre style par défaut
    contactMsg.textContent = "";
  }
});