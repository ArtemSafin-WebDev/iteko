import gsap from 'gsap';

export default function solutionHoops() {
    const hoop1 = document.querySelector('.js-solution-hoop-1');
    const hoop2 = document.querySelector('.js-solution-hoop-2');
    return;

    if (hoop1) {
        const firstShape = `M 372.437 387.187 C 579.87 484.209 710.481 716.273 614.209 922.104 C 565.834 1025.53 476.364 1112.83 373.104 1162.12 C 269.859 1211.4 153.256 1222.52 50.335 1174.38 C -52.713 1126.18 -124.139 1030.98 -157.682 921.692 C -191.228 812.396 -186.749 689.414 -138.429 586.106 C -90.01 482.586 -13.801 408.788 75.906 372.888 C 165.575 337.001 269.072 338.841 372.437 387.187 Z`;
        const secondShape = `M 432.5 377 C 639.93 474 719.5 714.5 651.3 923.5 C 613 1031 476.36 1112.83 373.1 1162.12 C 269.84 1211.41 153.26 1222.52 50.33 1174.38 C -52.6 1126.24 -124.14 1030.98 -157.67 921.69 C -191.2 812.4 -186.74 689.41 -138.42 586.11 C -90 482.59 -37.21 395.4 52.5 359.5 C 142.21 323.6 329.13 328.65 432.5 377 Z`;

        const tl = gsap.timeline({
            repeat: -1
        });

        tl.to(hoop1, {
            duration: 8,
            attr: { d: secondShape }
        }).to(hoop1, {
            duration: 8,
            attr: { d: firstShape }
        });
    }
    if (hoop2) {
        const firstShape = `M 370.179 385.049 C 556.92 472.392 670.026 692.21 575.731 893.812 C 528.369 995.072 443.826 1081.91 347.815 1132.46 C 251.796 1183.02 144.843 1197.04 52.242 1153.73 C -40.496 1110.35 -103.096 1020.78 -130.635 916.342 C -158.172 811.913 -150.505 693.097 -103.194 591.946 C -55.788 490.591 16.215 417.163 99.406 379.93 C 182.531 342.726 277.11 341.518 370.179 385.049 Z`;
        const secondShape = `M 404.5 363.5 C 591.24 450.84 702.29 691.9 608 893.5 C 560.64 994.76 443.83 1081.91 347.82 1132.5 C 251.81 1183.09 144.82 1197.08 52.24 1153.77 C -40.34 1110.46 -103.1 1020.77 -130.63 916.38 C -158.16 811.99 -184.81 681.69 -137.5 580.54 C -90.09 479.15 -10.19 398.73 73 361.5 C 156.19 324.27 311.43 320 404.5 363.5 Z`;

        const tl = gsap.timeline({
            repeat: -1
        });

        tl.to(hoop2, {
            duration: 3,
            attr: { d: secondShape }
        }).to(hoop2, {
            duration: 5,
            attr: { d: firstShape }
        });
    }
}
