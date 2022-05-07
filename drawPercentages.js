const numberSelector = document
  .querySelector("iframe#galaxyIframe")
  .contentWindow.document.querySelectorAll(
    "#ID-explorer-graph-lineChart > div.ID-chartDest div > table td"
  );

let list = [undefined];

const getNumbers = () => {
  numberSelector.forEach((val) => {
    const num = val.innerHTML.split("$")[1].replace(",", "");
    list = [...list, +num];
    console.log(list);
  });
};

const createText = (circle) => {
  let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");

  txt.innerHTML =
    Math.sign(calcPercentage()) === 1
      ? `+${calcPercentage()}%`
      : Math.sign(calcPercentage()) === -1
      ? `${calcPercentage()}%`
      : "";
  list = list.slice(1);
  const xAsis =
    Math.abs(calcPercentage()) > 9.99
      ? +circle.attributes.cx.value - 20
      : +circle.attributes.cx.value - 28;
  const yAxis =
    +circle.attributes.cy.value < 26
      ? +circle.attributes.cy.value + 22
      : +circle.attributes.cy.value - 15;
  txt.setAttribute("x", `${xAsis}`);
  txt.setAttribute("y", `${yAxis}`);
  circle.insertAdjacentElement("beforebegin", txt);
};

const calcPercentage = () => {
  const perc = (list[1] * 100) / list[0];
  return (perc - 100).toFixed(2);
};

const dotSelector = document
  .querySelector("iframe#galaxyIframe")
  .contentWindow.document.querySelectorAll(
    "#ID-explorer-graph-lineChart > div.ID-chartDest svg > g > g circle"
  );

const drawPercentages = () => {
  dotSelector.forEach((circle) => {
    createText(circle);
  });
};

getNumbers();
drawPercentages();
