document.addEventListener('DOMContentLoaded', () => {
    var demoForm = document.querySelector('#demo-form');

    if (demoForm) {
        demoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(demoForm)
                    .parsley()
                    .isValid()
            ) {
                demoForm.reset();
                $(demoForm)
                    .parsley()
                    .reset();
                if (typeof window.openModal === 'function') {
                    window.openModal('#demo-success');
                }
            }
        });
    }
    var registrationForm = document.querySelector('#registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(registrationForm)
                    .parsley()
                    .isValid()
            ) {
                registrationForm.reset();
                $(registrationForm)
                    .parsley()
                    .reset();
                if (typeof window.openModal === 'function') {
                    window.openModal('#registration-success');
                }
            }
        });
    }
    var vacancyForm = document.querySelector('#vacancy-form');

    if (vacancyForm) {
        vacancyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(vacancyForm)
                    .parsley()
                    .isValid()
            ) {
                vacancyForm.reset();
                $(vacancyForm)
                    .parsley()
                    .reset();
                vacancyForm.classList.add('success');

                setTimeout(function() {
                    vacancyForm.classList.remove('success');
                }, 3000);
            }
        });
    }
});
