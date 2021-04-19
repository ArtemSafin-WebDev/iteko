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
});
