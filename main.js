const activeCategory = (category) => {
    // console.log(category);
    
    const allButtons = document.querySelectorAll('.category-btn');
    allButtons.forEach(btn => {
        if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        }
        
    // document.getElementById(`category-btn-${category}`).classList.add('active');
    
        
    });
    const buttons = document.querySelector(`#category-btn-${category}`);
    // console.log(buttons);
    buttons.classList.add("active")
    
}

const loadByCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    displayCategories(data.categories);
}
loadByCategory()

const displayCategories = (categories) => {
    categories.map((category) => {
        // console.log(category);
        document.getElementById("category-section").innerHTML += `
        <div id="category-btn-${category.id}" onclick="activeCategory('${category.id}');loadCategoryPets('${category.category}')" class="category-btn flex gap-2 items-center border rounded px-[80px] py-5 hover:bg-[#0e812b2c] hover:border-[#0E7A81] hover:rounded-md cursor-pointer">
                    <img src=${category.category_icon} alt="">
                    <p class="font-bold text-2xl">${category.category}</p>
                </div>
        `
    })
}

const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    displayAllPet(data.pets)
    // sortByData(data.pets)
    // modalContent(data.pets)
}
loadAllPets()



const loadCategoryPets = async (petCategory) => {
    // console.log(typeof petCategory);
    const smallCap = petCategory.toLowerCase()
    // console.log(smallCap);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${smallCap}`)
    const data = await res.json()
    displayAllPet(data.data);
    // displayAllPet(sorted);
    document.getElementById("loading").classList.remove("hidden")
    document.getElementById("no-content").classList.add("hidden")
    
}

const sortByData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    document.getElementById("loading").classList.remove("hidden")
    let sorted = data.pets.sort((a, b) => b.price - a.price);
        displayAllPet(sorted)
        document.querySelector(".category-btn").classList.remove("active")
        // loadCategoryPets(sorted)
        // console.log(sorted);
    
    }


const displayAllPet = (pets) => {
    // console.log(pets);
    document.getElementById("card-container").innerHTML = ``

    setTimeout(()=>{
        document.getElementById("loading").classList.add("hidden")
        if (pets.length == 0) {
            // console.log("hello");
            // document.getElementById("adopt-container")
    document.getElementById("no-content").classList.remove("hidden")

            return
        }
        pets.forEach((pet) => {
            // let petDetails = pet.pet_details.replace("'s", " is")
            // const details = petDetails.includes("'")
            // if (details) {
            //     petDetails = "No Data Available"
            // }
            // let petDetails = JSON.stringify(pet.pet_details)
            // console.log(petDetails);
            document.getElementById("card-container").innerHTML += `
            <div id="${pet.petId}" " class="p-5 m-3 rounded-md shadow-md">
                            <img id="pet-img" class=" w-full rounded-md mb-5 h-[200px]" src=${pet.image || "No Image"} alt="">
                            <h1 class="text-2xl font-bold">${pet.pet_name || "Not Available"}</h1>
                            <div class="flex gap-2 items-center text-gray-500"><i class="fa-solid fa-list text-gray-500"></i><p>Breed: ${pet.breed || "Not Available"}</p></div>
                            <div class="flex gap-2 items-center"><i class="fa-solid fa-calendar-days text-gray-500"></i><p>Birth: ${pet.date_of_birth || "Not Available"}</p></div>
                            <div class="flex gap-2 items-center text-gray-500"><i class="fa-solid fa-person"></i><p>Gender: ${pet.gender || "Not Available"}</p></div>
                            <div class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign text-gray-500"></i><p>Price: ${pet.price || "Not Available"}$</p></div>
                            <p id="pet-desc-${pet.petId}" class="hidden">${pet.pet_details}</p>
                            <hr class="my-5">
                            <div class="flex gap-3 justify-between">
                                <button onclick="petContainer('${pet.image}'); " class="btn btn-sm bg-transparent border px-5"><i class="fa-solid fa-thumbs-up"></i></button>
                                <button onclick="adoptBtn(this)" class="btn btn-sm bg-transparent border text-[#0E7A81] rounded">Adopt</button>
                                <button onclick="my_modal_5.showModal(); modalContent('${pet.image || "No Data Available"}','${pet.pet_name || "No Data Available"}','${pet.breed || "No Data Available"}','${pet.gender || "No Data Available"}','${pet.vaccinated_status || "No Data Available"}','${pet.date_of_birth || "No Data Available"}','${pet.price || "No Data Available"}',${pet.petId})" class="btn btn-sm bg-transparent border text-[#0E7A81] rounded">Details</button>
                            </div>
                        </div>
            `
        })
    }, 2000)
    
}



const petContainer = (id) => {
    document.getElementById("pet-container").innerHTML += `
    <div>
    <img class="w-full md:w-[207px] lg:w-[225px] rounded-md lg:h-[150px]" src=${id} alt="">
    </div>
    `
}

const adoptBtn = (id) => {
    id.setAttribute("disabled","")
    id.innerText = "Adopted"
    
        const modal = document.getElementById("my_modal_2");
        modal.showModal();
    
        setTimeout(() => {

            document.getElementById("my_modal_2").close();
        }, 3000);
    
        document.getElementById("countDown").innerText = 3
    let count = 3; 
        const intervalId = setInterval(() => {
            count--; 

            document.getElementById("countDown").innerText = count
            if (count <= 0) {

                
                clearInterval(intervalId); 
            }
        }, 1000); 
}



const modalContent = (image,name,breed,gender,vaccinated,birth,price,details) => {
    console.log();
       const detailsStr = document.getElementById(`pet-desc-${details}`).innerText
        document.getElementById("modal-content").innerHTML = `
    <img class="w-full rounded-md mb-5" src=${image} alt="">
    <h1 class="text-2xl font-bold">${name}</h1>
    <div class="flex items-start gap-10">
        <div>
            <p class="flex gap-2 items-center"><i class="fa-solid fa-list text-gray-500"></i>Bread: ${breed}</p>
            <p class="flex gap-2 items-center"><i class="fa-solid fa-person"></i>Gender: ${gender}</p>
            <p class="flex gap-2 items-center">Vaccinated Status: ${vaccinated}</p>
        </div>
        <div>
            <p class="flex gap-2 items-center"><i class="fa-solid fa-calendar-days text-gray-500"></i>Birth: ${birth}</p>
            <p class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign text-gray-500"></i>Price: $${price}</p>
        </div>
    </div>
    <hr class="my-5">
    <h1 class="font-bold">Details</h1>
    <p>${detailsStr}</p>
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn w-[465px] mx-auto ">Cancel</button>
      </form>
    </div>
    `
}

const mobileMenu = (id) => {
    
    document.getElementById(id).classList.toggle("hidden")
    document.getElementById("")
}





  



