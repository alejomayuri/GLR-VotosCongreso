//Funciones del gráfico
var figures = document.querySelectorAll('figure');
const congresImgElement = document.querySelector('.congresImgElement');
const imgPerson = document.querySelector(".imgPerson");
console.log(congresImgElement);
var subscribeForm = document.getElementById('subscribe-float');

const displayPerson = document.querySelector(".displayPerson");
const noSelectMessage = document.querySelector(".noSelectMessage");
const elementImg = document.querySelector('.elementImg');
const elementText = document.querySelector(".elementText");
const personName = document.querySelector(".personName");
const personPartido = document.querySelector(".personPartido");
const personVacancia = document.querySelector(".personVacancia");
const personNacimiento = document.querySelector(".personNacimiento");
const personGenero = document.querySelector(".personGenero");
const personRegion = document.querySelector(".personRegion");
// const personVotos = document.querySelector(".personVotos");
const votosCantidad = document.querySelector(".votosCantidad");

const getEdad = (dateString) => {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
        edad--
    }
    return edad
}

inView('.congresImgElement').on('enter', function (figure) {
    parliament.on("click", (function (e) {
        figure.classList.add('is-loading');
        figure.classList.remove('is-loaded');
        imgPerson.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

        figure.classList.add('is-loading');

        newImg = new Image();
        newImg.src = `img/people/${e.party.foto}`
        newImg.classList.add('imgPerson');
        newImg.addEventListener('load', function () {

            figure.innerHTML = '';
            figure.appendChild(this);

            setTimeout(function () {
                figure.classList.remove('is-loading');
                figure.classList.add('is-loaded');
            }, 100);
        });

        const edad = getEdad(e.party.Nacimiento)

        const prevActive = document.querySelector(".active");
        if (prevActive) {
            prevActive.className.baseVal = prevActive.className.baseVal.replace("active", "");
            this.className.baseVal = this.className.baseVal + " active";
        } else {
            this.className.baseVal = this.className.baseVal + " active";
        }

        elementImg.className = `elementImg imgPersonBorder-${e.party.id}`
        elementText.className = `elementText imgPersonBorder-${e.party.id}`
        displayPerson.className = `displayPerson`
        noSelectMessage.className = 'close'
        personName.textContent = e.party.Congresista
        personPartido.textContent = e.party.Bancada
        personVacancia.textContent = `Vacancia: ${e.party.Vacancia}`
        personNacimiento.textContent = `Edad: ${edad} años`
        personGenero.textContent = `Género: ${e.party.Genero}`
        personRegion.textContent = `Región: ${e.party.Region} `
        // personVotos.textContent = `Votos obtenidos: ${e.party.Votos}`
    }))
});

const tipeVotoAfavor = document.querySelector(".tipe-Afavor");
const tipeVotoEncontra = document.querySelector(".tipe-Encontra");
const tipeVotoAbstencion = document.querySelector(".tipe-Abstencion");
const tipeVotoNovoto = document.querySelector(".tipe-Novoto");
let filterVoto = ''

fetch("elements.json")
    .then(response => response.json())
    .then(data => {
        const congresPersonContainer = document.querySelector("#congresPersonContainer");
        const congresPerson = data;

        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const SortArray = (d) => {
            const namesArray = []
            const orderCongresArray = []
            for (element in d) {
                namesArray[element] = d[element].Congresista
            }
            for (ele in namesArray) {
                orderCongresArray[ele] = d.filter(congres => congres.Congresista == namesArray.sort()[ele])[0]
            }
            return orderCongresArray
        }

        tipeVotoAfavor.addEventListener('click', function () {
            if (filterVoto === 'Afavor') {
                const congresPersonContainerHTML = SortArray(congresPerson).map(congresPerson => {
                    const identificadorVoto = removeAccents(congresPerson.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresPerson.Congresista}</p>
                            <span class="partyName">${congresPerson.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                filterVoto = ''
                tipeVotoAfavor.className = 'tipe tipe-Afavor'
                votosCantidad.textContent = `${congresPerson.length} votos`
            } else {
                filterVoto = 'Afavor'
                const congresVotoAFavor = SortArray(congresPerson).filter(elm => removeAccents(elm.Vacancia.split(" ").join("")) === filterVoto)
                const congresPersonContainerHTML = congresVotoAFavor.map(congresVotoAFavor => {
                    const identificadorVoto = removeAccents(congresVotoAFavor.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresVotoAFavor.Congresista}</p>
                            <span class="partyName">${congresVotoAFavor.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                tipeVotoAfavor.className = 'tipe tipe-Afavor active-filter-Afavor'
                tipeVotoEncontra.className = 'tipe tipe-Encontra'
                tipeVotoAbstencion.className = 'tipe tipe-Abstencion'
                tipeVotoNovoto.className = 'tipe tipe-Novoto'
                votosCantidad.textContent = `${congresVotoAFavor.length} votos`
            }
        })

        tipeVotoEncontra.addEventListener('click', function () {
            if (filterVoto === 'Encontra') {
                const congresPersonContainerHTML = SortArray(congresPerson).map(congresPerson => {
                    const identificadorVoto = removeAccents(congresPerson.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresPerson.Congresista}</p>
                            <span class="partyName">${congresPerson.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                filterVoto = ''
                tipeVotoEncontra.className = 'tipe tipe-Encontra'
                votosCantidad.textContent = `${congresPerson.length} votos`
            } else {
                filterVoto = 'Encontra'
                const congresVotoEncontra = SortArray(congresPerson).filter(elm => removeAccents(elm.Vacancia.split(" ").join("")) === filterVoto)
                const congresPersonContainerHTML = congresVotoEncontra.map(congresVotoEncontra => {
                    const identificadorVoto = removeAccents(congresVotoEncontra.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresVotoEncontra.Congresista}</p>
                            <span class="partyName">${congresVotoEncontra.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                tipeVotoAfavor.className = 'tipe tipe-Afavor'
                tipeVotoEncontra.className = 'tipe tipe-Encontra active-filter-Encontra'
                tipeVotoAbstencion.className = 'tipe tipe-Abstencion'
                tipeVotoNovoto.className = 'tipe tipe-Novoto'
                votosCantidad.textContent = `${congresVotoEncontra.length} votos`
            }
        })

        tipeVotoAbstencion.addEventListener('click', function () {
            if (filterVoto === 'Abstencion') {
                const congresPersonContainerHTML = SortArray(congresPerson).map(congresPerson => {
                    const identificadorVoto = removeAccents(congresPerson.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresPerson.Congresista}</p>
                            <span class="partyName">${congresPerson.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                filterVoto = ''
                tipeVotoAbstencion.className = 'tipe tipe-Abstencion'
                votosCantidad.textContent = `${congresPerson.length} votos`
            } else {
                filterVoto = 'Abstencion'
                const congresVotoAbstencion = SortArray(congresPerson).filter(elm => removeAccents(elm.Vacancia.split(" ").join("")) === filterVoto)
                const congresPersonContainerHTML = congresVotoAbstencion.map(congresVotoAbstencion => {
                    const identificadorVoto = removeAccents(congresVotoAbstencion.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresVotoAbstencion.Congresista}</p>
                            <span class="partyName">${congresVotoAbstencion.Bancada}</span>
                        </div>    
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                tipeVotoAfavor.className = 'tipe tipe-Afavor'
                tipeVotoEncontra.className = 'tipe tipe-Encontra'
                tipeVotoAbstencion.className = 'tipe tipe-Abstencion active-filter-Abstencion'
                tipeVotoNovoto.className = 'tipe tipe-Novoto'
                votosCantidad.textContent = `${congresVotoAbstencion.length} votos`
            }
        })

        tipeVotoNovoto.addEventListener('click', function () {
            if (filterVoto === 'Novoto') {
                const congresPersonContainerHTML = SortArray(congresPerson).map(congresPerson => {
                    const identificadorVoto = removeAccents(congresPerson.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresPerson.Congresista}</p>
                            <span class="partyName">${congresPerson.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                filterVoto = ''
                tipeVotoNovoto.className = 'tipe tipe-Novoto'
                votosCantidad.textContent = `${congresPerson.length} votos`
            } else {
                filterVoto = 'Novoto'
                const congresVotoNovoto = SortArray(congresPerson).filter(elm => removeAccents(elm.Vacancia.split(" ").join("")) === filterVoto)
                const congresPersonContainerHTML = congresVotoNovoto.map(congresVotoNovoto => {
                    const identificadorVoto = removeAccents(congresVotoNovoto.Vacancia.split(" ").join(""));
                    return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresVotoNovoto.Congresista}</p>
                            <span class="partyName">${congresVotoNovoto.Bancada}</span>
                        </div>
                    </div>
                `
                }).join("");
                congresPersonContainer.innerHTML = congresPersonContainerHTML;
                tipeVotoAfavor.className = 'tipe tipe-Afavor'
                tipeVotoEncontra.className = 'tipe tipe-Encontra'
                tipeVotoAbstencion.className = 'tipe tipe-Abstencion'
                tipeVotoNovoto.className = 'tipe tipe-Novoto active-filter-Novoto'
                votosCantidad.textContent = `${congresVotoNovoto.length} votos`
            }
        })

        const congresPersonContainerHTML = SortArray(congresPerson).map(congresPerson => {
            const identificadorVoto = removeAccents(congresPerson.Vacancia.split(" ").join(""));
            return `
                    <div class="congresPersonText">
                        <div class="identificador ${identificadorVoto}"></div>
                        <div>
                            <p>${congresPerson.Congresista}</p>
                            <span class="partyName">${congresPerson.Bancada}</span>
                        </div>
                    </div>
                `
        }).join("");
        congresPersonContainer.innerHTML = congresPersonContainerHTML;
        votosCantidad.textContent = `${congresPerson.length} votos`
    })
