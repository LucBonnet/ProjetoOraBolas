const bola = {
    raio: 25 / 4,
    trajetoria: {
        t: [],
        x: [],
        y: [],
    },
    x: 0,
    y: 0,
    t: 0,
};

let robo = {
    raio: 45 / 2,
    x: 0,
    y: 0,
    trajetoria: {
        x: [],
        y: [],
        v: [],
        a: [],
    },
    velMax: 2.8,
    aMax: 2.8,
    graus: 0,
    dInter: 0.1,
    x0: "",
    y0: "",
};

let simulacao = {
    t: 0,
    tFinal: 0,
    d: [],
};
