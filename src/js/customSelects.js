import Choices from 'choices.js';

function initializeSelects() {
    const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));

    customSelects.forEach(select => {
        new Choices(select, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position: 'bottom',
            callbackOnCreateTemplates: function(template) {
                return {
                    choice: (classNames, data) => {
                        return template(`
                      <div class="${classNames.item} ${classNames.itemChoice} ${data.selected ? classNames.selectedState : ''} ${
                            data.placeholder ? classNames.placeholder : ''
                        } ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${
                            this.config.itemSelectText
                        }" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${
                            data.id
                        }" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>

                        <span class="choice-radio"> </span>
                        ${data.label}
                      </div>
                    `);
                    }
                };
            }
        });
    });
}

export default function customSelects() {
    window.initializeSelects = initializeSelects;
    initializeSelects();
}
