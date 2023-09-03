import "./style.css";
import data from "./testobj.json";
import {
  onlyBeginners,
  genUserIdObject,
  createUserArrays,
  sortArraysbyArray,
  graphFromUserID,
} from "./plotly-testing";

// console.log(onlyBeginners(data));
// console.log(createUserArrays(onlyBeginners(data)));
// const [test1, test2] = createUserArrays(onlyBeginners(data));
// console.log(test1);
// console.log(test2);

function createPageStructure() {
  // main section
  const main = document.createElement("main");
  main.dataObject = onlyBeginners(data);

  // const h1 = document.createElement("h1");
  // h1.textContent = "Bracket About Nothing";
  // main.appendChild(h1);

  const fig = document.createElement("figure");
  fig.classList.add("main-section");
  fig.textContent = "Graph will be here";
  main.appendChild(fig);

  //topleft
  const secTopLeft = document.createElement("section");
  secTopLeft.classList.add("main-section");
  secTopLeft.id = "name-section";

  const topLeftH1 = document.createElement("h1");
  topLeftH1.textContent = "BAN BEGINNER STATS";
  secTopLeft.appendChild(topLeftH1);

  const topLeftH2 = document.createElement("h2");
  topLeftH2.textContent = "CONTENDER";
  secTopLeft.appendChild(topLeftH2);

  const topLeftH3 = document.createElement("h3");
  topLeftH3.textContent = "Extav";
  secTopLeft.appendChild(topLeftH3);

  main.appendChild(secTopLeft);

  // topright
  const secTopRight = document.createElement("section");
  secTopRight.classList.add("main-section");
  secTopRight.id = "info-section";

  const stats1 = document.createElement("div");
  const label1 = document.createElement("h2");
  const value1 = document.createElement("h3");

  stats1.classList.add("stat-item");
  label1.textContent = "BANs Competed";
  value1.textContent = "Calculating...";

  stats1.appendChild(label1);
  stats1.appendChild(value1);
  secTopRight.appendChild(stats1);

  const stats2 = document.createElement("div");
  const label2 = document.createElement("h2");
  const value2 = document.createElement("h3");

  stats2.classList.add("stat-item");
  label2.textContent = "Best Placement";
  value2.textContent = "Calculating...";

  stats2.appendChild(label2);
  stats2.appendChild(value2);
  secTopRight.appendChild(stats2);

  main.appendChild(secTopRight);

  document.body.appendChild(main);

  // config section
  const configSection = document.createElement("section");
  configSection.id = "config";

  const customizationSection = document.createElement("section");
  customizationSection.id = "customization-section";

  const controlsHeader = document.createElement("h1");
  controlsHeader.textContent = "Select Contender";
  customizationSection.appendChild(controlsHeader);
  customizationSection.append(createPlayerSelectionBar());
  const submitButton = document.createElement("button");
  submitButton.textContent = "Generate";
  submitButton.type = "button";
  submitButton.id = "graph-button";
  submitButton.onclick = clickButtonGraph;
  customizationSection.appendChild(submitButton);
  configSection.appendChild(customizationSection);

  const infoSection = document.createElement("section");
  infoSection.id = "creator-info";
  infoSection.appendChild(document.createElement("h1"));
  infoSection.appendChild(document.createElement("p"));
  configSection.appendChild(infoSection);

  document.body.appendChild(configSection);

  // fig.innerHTML = "";
  clearGraph();
  // graphFromUserID(fig, main.dataObject, 1894586, "Extav");
  clickButtonGraph();
}

function fillInfoSection(title, content) {
  const infoSec = document.querySelector("#creator-info");
  // console.log(infoSec);
  infoSec.children[0].textContent = title;
  infoSec.children[1].textContent = content;
}

function clearGraph() {
  const fig = document.querySelector("figure");
  fig.innerHTML = "";

  document.querySelector("#name-section").children[2].textContent = " ";

  const statComponents = document.querySelector("#info-section").children;
  statComponents[0].children[1].textContent = " ";
  statComponents[1].children[1].textContent = " ";
}

function updateTextFields(name, numCompeted, bestPlacement) {
  document.querySelector("#name-section").children[2].textContent = name;

  const statComponents = document.querySelector("#info-section").children;
  statComponents[0].children[1].textContent = numCompeted;
  statComponents[1].children[1].textContent = bestPlacement;
}

function clickButtonGraph() {
  clearGraph();
  const box = document.querySelector("#player-selection-bar");
  const name = box.options[box.selectedIndex].textContent;
  const uid = parseInt(document.querySelector("#player-selection-bar").value);
  const fig = document.querySelector("figure");
  const dataObj = document.querySelector("main").dataObject;
  const [numCompeted, bestPlacement] = graphFromUserID(fig, dataObj, uid, name);

  updateTextFields(name, numCompeted, bestPlacement);
  // console.log(box.options[box.selectedIndex].textContent);
  // console.log("Generated a new graph with uid " + uid);
}

function populateSelectionBar(component, values, texts) {
  values.map((v, i) => {
    const option = document.createElement("option");
    option.value = values[i];
    option.textContent = texts[i];
    component.appendChild(option);
  });
}

function createPlayerSelectionBar() {
  const playerSelectionBar = document.createElement("select");
  playerSelectionBar.id = "player-selection-bar";
  const dataObj = document.querySelector("main").dataObject;
  const [idArray, nameArray] = createUserArrays(dataObj);
  const [sortedIdArray, sortedNameArray] = sortArraysbyArray(nameArray, [
    idArray,
    nameArray,
  ]);
  populateSelectionBar(playerSelectionBar, sortedIdArray, sortedNameArray);

  playerSelectionBar
    .querySelector("[value='1894586']")
    .toggleAttribute("selected");
  return playerSelectionBar;
}

export { createPageStructure, fillInfoSection };
