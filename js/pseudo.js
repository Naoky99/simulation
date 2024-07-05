const pseudos = {
    normalize: (results) => {
        return results.map(i => {
            const length = i.toString().length;
            const divisor = "1".padEnd(length + 1, '0');
            return i / parseInt(divisor);
        });
    },
    cuadradosMedios: function (seed, iterations) {
        let results = [];
        let num = seed;

        for (let i = 0; i < iterations; i++) {
            // Cuadrar el número
            let squared = (num * num).toString().padStart(8, '0');

            // Tomar la parte central (suponiendo que es un número de 8 dígitos)
            let middle = squared.substring(2, 6);

            // Convertir la parte central a número y agregar a los resultados
            num = parseInt(middle);
            results.push(num);
        }

        return this.normalize(results);
    },

    productoMedio: function (seed1, seed2, iterations) {
        let results = [];
        let num1 = seed1;
        let num2 = seed2;

        for (let i = 0; i < iterations; i++) {
            // Multiplicar los números
            let product = (num1 * num2).toString().padStart(8, '0');

            // Tomar la parte central (suponiendo que es un número de 8 dígitos)
            let middle = product.substring(2, 6);

            // Convertir la parte central a número y agregar a los resultados
            let nextNum = parseInt(middle);
            results.push(nextNum);

            // Actualizar los números para la próxima iteración
            num1 = num2;
            num2 = nextNum;
        }

        return this.normalize(results);
    },
    congruencialAditivo: function (seedArray, iterations, modulo) {
        let results = [...seedArray]; // Copiar la secuencia inicial
        let k = seedArray.length;

        for (let i = 0; i < iterations; i++) {
            // Calcular el siguiente número como la suma de los últimos k números de la secuencia
            let nextNum = 0;
            for (let j = 0; j < k; j++) {
                nextNum += results[results.length - k + j];
            }

            // Aplicar el módulo
            nextNum = nextNum % modulo;

            // Agregar el nuevo número a la secuencia
            results.push(nextNum);
        }

        // Retornar solo los nuevos números generados
        return this.normalize(results);
    },

    congruencialMultiplicativo: function (seed, a, m, iterations) {
        let results = [];
        let num = seed;

        for (let i = 0; i < iterations; i++) {
            // Multiplicar por la constante y tomar el módulo
            num = (a * num) % m;

            // Agregar el resultado a los resultados
            results.push(num);
        }

        return this.normalize(results);
    },

    congruencialLineal: function (seed, a, c, m, iterations) {
        let results = [];
        let num = seed;

        for (let i = 0; i < iterations; i++) {
            // Aplicar la fórmula del generador congruencial lineal
            num = (a * num + c) % m;

            // Agregar el resultado a los resultados
            results.push(num);
        }

        return this.normalize(results);
    }

}

export default pseudos;