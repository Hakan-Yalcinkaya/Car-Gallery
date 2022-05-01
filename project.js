const form=document.querySelector("#car-form");
const titleElement=document.querySelector("#title");
const priceElement=document.querySelector("#price");
const urlElement=document.querySelector("#url");
const cardbody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-cars");

//Start UI OBJECT

const ui=new UI();
const storage=new Storage();

//Load All Events

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);

    document.addEventListener("DOMContentLoaded",function(){
        let cars=storage.getCarsFromStorage();

        ui.loadAllCars(cars);
    })
    cardbody.addEventListener("click",deleteCar);
    clear.addEventListener("click",clearAllCars);

}
function addCar(e){
    const title=titleElement.value;
    const price=priceElement.value;
    const url=urlElement.value;

    if(title==="" ||price===""||url===""){
        ui.displayMessages("Tüm Alanları Doldurun..","danger");
    }
    else{
        //new car
        const newCar=new Car(title,price,url);
        ui.addCarToUI(newCar); //ADD CAR TO UI
        storage.addCarToStorage(newCar);
        ui.displayMessages("Araç Başarı ile Eklendi","success");
    }
    ui.clearInputs(titleElement,urlElement,priceElement);
    e.preventDefault();
}

function deleteCar(e){
    if(e.target.id==="delete-car"){
        ui.deleteCarFromUI(e.target);
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarı İle Gerçekleşti","success");
        
    }
}

function clearAllCars(){
    if(confirm("Tüm Araçları Silmek İstediğinize Emin Misiniz?")){
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
    }
}