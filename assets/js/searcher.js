let loadProductos = async () => {
    
    let row = document.getElementsByClassName('row')[3]
    row.innerHTML = ''
    try {
        let urlJson = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json'

        let responseJson = await fetch( urlJson ); 
        let resultJson = await responseJson.json();
    
        resultJson.forEach(element => {
            let name = element.name
            let src = element.src
            let type = element.type
            let price = element.price
            let plantilla = `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                        <div class="card card-blog card-plain">
                        <div class="card-header p-0 mt-n4 mx-3">
                            <a class="d-block shadow-xl border-radius-xl">
                            <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                            </a>
                        </div>
                        <div class="card-body p-3">
                            <p class="mb-0 text-sm">${type}</p>
                            <a href="javascript:;">
                            <h5>
                                ${name}
                            </h5>
                            </a>
                            <p class="mb-4 text-sm">
                            <b>Price: </b> $ ${price}
                            </p>
                        </div>
                        </div>
                    </div>`
            row.innerHTML += plantilla
        });

    } catch (error) {
        
        console.log( error );

    }

    try {

        let urlXml = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml'

        let responseXml = await fetch( urlXml ); 
        let resultXml = await responseXml.text()
        let xml = (new DOMParser()).parseFromString(resultXml, 'application/xml');

        let arrProductos = xml.getElementsByTagName("product")

        for(let i=0;i<arrProductos.length;i++) {
            let element = arrProductos[i]
            let name = element.getElementsByTagName("name")[0].innerHTML
            let src = element.getElementsByTagName("src")[0].innerHTML
            let type = element.getElementsByTagName("type")[0].innerHTML
            let price = element.getElementsByTagName("price")[0].innerHTML
            let plantilla = `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                        <div class="card card-blog card-plain">
                            <div class="card-header p-0 mt-n4 mx-3">
                                <a class="d-block shadow-xl border-radius-xl">
                                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                </a>
                            </div>
                            <div class="card-body p-3">
                                <p class="mb-0 text-sm">${type}</p>
                                <a href="javascript:;">
                                <h5>
                                    ${name}
                                </h5>
                                </a>
                                <p class="mb-4 text-sm">
                                <b>Price: </b> $ ${price}
                                </p>
                            </div>
                        </div>
                    </div>`
            row.innerHTML += plantilla
        }
  
    } catch (error) {
    
        console.log( error );

    }
}

let click = () => {
    let boton = document.getElementById("filter")
    boton.addEventListener("click",(event)=>{
        let input = document.getElementById("text").value
        let cards = document.getElementsByClassName("col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4")
        for(let i=0;i<cards.length;i++){
            let card = cards[i].getElementsByTagName("div")[0].getElementsByTagName("div")[1]
            let type = card.getElementsByTagName("p")[0].innerHTML
            let name = card.getElementsByTagName("h5")[0].innerHTML
            if(input===name.trim() || input===type.trim() || input===""){
                cards[i].classList.remove("d-none")
            }else{
                cards[i].classList.add("d-none")
            }
        }
    }) 
}

loadProductos()
click()