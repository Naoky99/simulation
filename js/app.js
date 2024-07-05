import pseudos from "./pseudo.js";
import uniformidad from "./distribucion.js";


const init = () => {
    fetch("../components/login.html")
        .then(p => p.text())
        .then(t => {
            //const node = document.createTextNode(t);
            document.getElementById("main").innerHTML = t
            document.getElementById("executeLogin").onclick = login;
        })
}

const goToMenu = () => {
    fetch("../components/menu.html")
        .then(p => p.text())
        .then(t => {
            //const node = document.createTextNode(t);
            document.getElementById("main").innerHTML = t;

            document.getElementById("generarCuadradosMedios").onclick = generarCuadradosMedios;
            document.getElementById("generarAditivo").onclick = generarAditivo;
            document.getElementById("generarLineal").onclick = generarLineal;
            document.getElementById("generarMultiplicativo").onclick = generarMultiplicativo;
            document.getElementById("generarProductoMedio").onclick = generarProductoMedio;

            document.getElementById("calcularChi").onclick = calcularChiCuadrada;
            document.getElementById("calcularKS").onclick = calcularKS;
            document.getElementById("generarTransformada").onclick = generarTransformadaInversa;
            document.getElementById("generarConvolucion").onclick = generarConvolucion;
        })
}

init();

const allowedUsers = [
    { user: "test", pass: "1234" },
    { user: "ccc", pass: "111" }

]

const login = (e) => {
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;

    const allowed = allowedUsers.some(x => x.user == user && x.pass == pass);
    if (allowed)
        goToMenu();
    else alert("Usuario o clave erronea")
}

//#region Pseudoaleatorios
function generarCuadradosMedios() {
    let seed = parseInt(document.getElementById("semillaCuadrados").value);
    let length = parseInt(document.getElementById("longCuadrados").value);
    let results = pseudos.cuadradosMedios(seed, length);
    document.getElementById("resultCuadrados").innerText = results.join(', ');
}

function generarProductoMedio() {
    let seed1 = parseInt(document.getElementById("semilla1Producto").value);
    let seed2 = parseInt(document.getElementById("semilla2Producto").value);
    let length = parseInt(document.getElementById("longProducto").value);
    let results = pseudos.productoMedio(seed1, seed2, length);
    document.getElementById("resultProducto").innerText = results.join(', ');
}

function generarAditivo() {
    let seeds = document.getElementById("semillasAditivo").value.split(',').map(Number);
    let modulo = parseInt(document.getElementById("moduloAditivo").value);
    let length = parseInt(document.getElementById("longAditivo").value);
    let results = pseudos.congruencialAditivo(seeds, length, modulo);
    document.getElementById("resultAditivo").innerText = results.join(', ');
}

function generarMultiplicativo() {
    let seed = parseInt(document.getElementById("semillaMultiplicativo").value);
    let a = parseInt(document.getElementById("constanteAMultiplicativo").value);
    let modulo = parseInt(document.getElementById("moduloMultiplicativo").value);
    let length = parseInt(document.getElementById("longMultiplicativo").value);
    let results = pseudos.congruencialMultiplicativo(seed, a, modulo, length);
    document.getElementById("resultMultiplicativo").innerText = results.join(', ');
}

function generarLineal() {
    let seed = parseInt(document.getElementById("semillaLineal").value);
    let a = parseInt(document.getElementById("constanteALineal").value);
    let c = parseInt(document.getElementById("constanteCLineal").value);
    let modulo = parseInt(document.getElementById("moduloLineal").value);
    let length = parseInt(document.getElementById("longLineal").value);
    let results = pseudos.congruencialLineal(seed, a, c, modulo, length);
    document.getElementById("resultLineal").innerText = results.join(', ');
}

//#endregion

//#region Otro
function calcularChiCuadrada() {
    let observed = document.getElementById("observedChi").value.split(',').map(Number);
    let expected = document.getElementById("expectedChi").value.split(',').map(Number);
    let chiSquared = uniformidad.chiCuadrada(observed, expected);
    document.getElementById("resultChi").innerText = chiSquared;
}

function calcularKS() {
    let sample1 = document.getElementById("muestra1KS").value.split(',').map(Number);
    let sample2 = document.getElementById("muestra2KS").value.split(',').map(Number);
    let ksStatistic = uniformidad.kolmogorovSmirnov(sample1, sample2);
    document.getElementById("resultKS").innerText = ksStatistic;
}

function generarTransformadaInversa() {
    let lambda = parseFloat(document.getElementById("lambdaTransformada").value);
    let n = parseInt(document.getElementById("numTransformada").value);
    let randomNumbers = uniformidad.transformadaInversaExponencial(lambda, n);
    document.getElementById("resultTransformada").innerText = randomNumbers.join(', ');
}

function generarConvolucion() {
    let mu = parseFloat(document.getElementById("muConvolucion").value);
    let sigma = parseFloat(document.getElementById("sigmaConvolucion").value);
    let n = parseInt(document.getElementById("numConvolucion").value);
    let randomNumbers = uniformidad.convolucionNormal(mu, sigma, n);
    document.getElementById("resultConvolucion").innerText = randomNumbers.join(', ');
}
//#endregion
