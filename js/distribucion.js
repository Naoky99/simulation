
const uniformidad = {
    chiCuadrada: function chiCuadrada(observed, expected) {
        if (observed.length !== expected.length) {
            throw new Error('Los arreglos de frecuencias observadas y esperadas deben tener la misma longitud.');
        }

        let chi2 = 0;

        for (let i = 0; i < observed.length; i++) {
            chi2 += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }

        return chi2;
    },

    kolmogorovSmirnov: function (sample1, sample2) {
        // Ordenar las muestras
        sample1.sort((a, b) => a - b);
        sample2.sort((a, b) => a - b);

        let n1 = sample1.length;
        let n2 = sample2.length;
        let dMax = 0;

        // Índices para recorrer las muestras
        let i = 0;
        let j = 0;

        while (i < n1 && j < n2) {
            let d1 = (i + 1) / n1;
            let d2 = (j + 1) / n2;

            if (sample1[i] < sample2[j]) {
                dMax = Math.max(dMax, Math.abs(d1 - j / n2));
                i++;
            } else if (sample1[i] > sample2[j]) {
                dMax = Math.max(dMax, Math.abs(i / n1 - d2));
                j++;
            } else {
                dMax = Math.max(dMax, Math.abs(d1 - d2));
                i++;
                j++;
            }
        }

        while (i < n1) {
            let d1 = (i + 1) / n1;
            dMax = Math.max(dMax, Math.abs(d1 - j / n2));
            i++;
        }

        while (j < n2) {
            let d2 = (j + 1) / n2;
            dMax = Math.max(dMax, Math.abs(i / n1 - d2));
            j++;
        }

        return dMax;
    },

    transformadaInversaExponencial: function (lambda, n) {
        let results = [];

        for (let i = 0; i < n; i++) {
            let u = Math.random(); // Genera un número uniforme entre 0 y 1
            let x = -Math.log(1 - u) / lambda; // Aplicar la fórmula de transformada inversa
            results.push(x);
        }

        return results;
    },

    convolucionNormal: function (mu, sigma, n) {
        let results = [];

        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < 12; j++) {
                sum += Math.random(); // Suma de 12 números uniformes
            }
            let normal = (sum - 6) * sigma + mu; // Ajuste a media (mu) y desviación estándar (sigma)
            results.push(normal);
        }

        return results;
    }


}


export default uniformidad;