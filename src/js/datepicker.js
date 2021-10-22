import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

function initializeDatepicker() {
    const elements = Array.from(document.querySelectorAll('.js-datepicker'));

    elements.forEach(element => {
        $(element)
            .datepicker({
                format: 'dd.mm.yyyy',
                container: element.getAttribute('data-container'),
                language: 'ru',
                autoclose: true
            })
            .on('show', function(e) {
                element.classList.add('datepicker-shown');
            })
            .on('hide', function(e) {
                element.classList.remove('datepicker-shown');
            });
    });
}

export default function datepicker() {
    window.initializeDatepicker = initializeDatepicker;
    initializeDatepicker();
}
