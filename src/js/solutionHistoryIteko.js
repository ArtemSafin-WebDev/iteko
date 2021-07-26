export default function solutionHistoryIteko() {
  const elements = Array.from(document.querySelectorAll('.solution-history'));
  let yearsList;
  let annotationsList;

  let currentYearIdx;

  elements.forEach(element => {
    yearsList = Array.from(element.querySelectorAll('.solution-history__year-item'));
    annotationsList = Array.from(element.querySelectorAll('.solution-history__annotation-item'));

    const setCurrentYear = (index) => {
      if (currentYearIdx || currentYearIdx === 0) {
        yearsList[currentYearIdx].classList.remove('solution-history__year-item--active');
        annotationsList[currentYearIdx].classList.remove('solution-history__annotation-item--active');
      }

      currentYearIdx = index;
      yearsList[index].classList.add('solution-history__year-item--active');
      annotationsList[index].classList.add('solution-history__annotation-item--active');
    }

    setCurrentYear(0);

    yearsList.forEach((yearItem, index) => {
      yearItem.onclick = () => {
        setCurrentYear(index);
      }
    })

    annotationsList.forEach((annotationItem, index) => {
      annotationItem.onclick = () => {
        setCurrentYear(index);
      }
    })
  });
}
