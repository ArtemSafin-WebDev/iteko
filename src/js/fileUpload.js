export default function fileUpload() {
    const elements = Array.from(document.querySelectorAll('.js-file-upload'));

    elements.forEach(element => {
        const input = element.querySelector('input[type="file"]');
        const label = element.querySelector('.js-file-upload-text');
        const originalLabelText = label.textContent;
        const form = element.closest('form');
        input.addEventListener('change', () => {
            if (input.files.length) {
                // label.textContent = input.files[0].name;

                label.innerHTML = `
                    <svg width="14" height="14" aria-hidden="true" class="icon-file">
                        <use xlink:href="#file"></use>
                    </svg>
                    <span class="file-upload-text-content">${input.files[0].name}</span>
                   

                    <span class="close">
                        <svg width="14" height="14" aria-hidden="true" class="icon-cross">
                            <use xlink:href="#cross"></use>
                        </svg>
                    </span>
                `;
                element.classList.add('file-loaded');
            } else {
                label.innerHTML = originalLabelText;
                element.classList.remove('file-loaded');
            }
        });

        input.addEventListener('dragenter', () => {
            element.classList.add('dragged');
        });
        input.addEventListener('dragend', () => {
            element.classList.remove('dragged');
        });
        input.addEventListener('dragleave', () => {
            element.classList.remove('dragged');
        });
        input.addEventListener('drop', () => {
            element.classList.remove('dragged');
        });

        element.addEventListener('click', event => {
            if (event.target.matches('.close') || event.target.closest('.close')) {
                event.preventDefault();
                input.value = '';
                label.innerHTML = originalLabelText;
                element.classList.remove('file-loaded');
            }
        });

        if (form) {
            form.addEventListener('reset', () => {
                input.value = '';
                label.innerHTML = originalLabelText;
                element.classList.remove('file-loaded');
            })
        }
    });
}
