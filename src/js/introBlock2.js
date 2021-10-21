export default function introBlock2() {
  const btnClose = document.querySelector('.js-close-block-2');
  const introElems = document.querySelector('.js-intro');
  const introBlock2Elems = document.querySelector('.js-intro-block-2');

  btnClose.onclick = () => {
    setTimeout(() => {
      introElems.classList.add('mod-show');
    }, 300)
    introBlock2Elems.classList.add('mod-hide');
  }
}
