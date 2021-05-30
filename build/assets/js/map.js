document.addEventListener('DOMContentLoaded', () => {
    const maps = Array.from(document.querySelectorAll('.js-contacts-map'));

    maps.forEach(map => {
        const mapElement = map.querySelector('.contacts__map');

        ymaps.ready(init);
        function init() {

            const ZOOM_FACTOR = window.matchMedia("(max-width: 640px)").matches ? 13 : 14;
            const mapInstance = new ymaps.Map(mapElement, {
                center: [55.753220, 37.622513],
                controls: [],
                zoom: ZOOM_FACTOR
            });

            const officeRadios = Array.from(document.querySelectorAll('.contacts__map-offices-checkbox-input'));
            const officesForm = document.querySelector('.contacts__map-offices');

            const offices = [
                {
                    id: 1,
                    coords: [55.683508, 37.573968]
                },
                {
                    id: 2,
                    coords: [55.673905, 37.559541]
                },
                {
                    id: 3,
                    coords: [55.682717, 37.565237]
                }
            ];

            const objectManager = new ymaps.ObjectManager({
                clusterize: false,
                clusterHasBalloon: false,
                geoObjectOpenBalloonOnClick: false
            });

            mapInstance.geoObjects.add(objectManager);

            const setPoints = activeId => {
                objectManager.removeAll();

                window.requestAnimationFrame(() => {
                    offices.forEach(office => {
                        console.log('OFFICE ID', office.id);
                        console.log('ACTIVE ID', activeId);
                        const officeToAdd = {
                            id: office.id,
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: office.coords
                            },
                            options: {
                                iconLayout: 'default#image',
                                iconImageHref: office.id == activeId ? 'img/large-pin.svg' : 'img/small-pin.svg',
                                iconImageSize: office.id == activeId ? (window.matchMedia("(max-width: 640px)").matches ? [60, 60] : [80, 80]) : [28, 28],
                                iconImageOffset: office.id == activeId ? (window.matchMedia("(max-width: 640px)").matches ? [-30, -30] : [-40, -40]) : [-14, -14]
                            }
                        };

                        console.log('Office to add', officeToAdd);

                        objectManager.add(officeToAdd);
                    });

                    const selectedOffice = offices.find(element => element.id == activeId);
                    if (selectedOffice) {
                        mapInstance.setCenter(selectedOffice.coords, ZOOM_FACTOR, {
                            duration: 500
                        });
                    }
                });
            };

            officeRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    const activeId = officesForm.elements['office'].value;

                    setPoints(activeId);
                });
            });

            console.log('Initial office ID', officesForm.elements['office'].value);
            setPoints(officesForm.elements['office'].value);

            window.setPoints = setPoints;
            window.clearPoints = () => {
                objectManager.removeAll();
            };

            mapInstance.behaviors.disable('scrollZoom');

            mapInstance.controls.add('zoomControl', {
                size: "small",
                position: {
                    right: 20,
                    bottom: 80
                }
            });
        }
    });
});
