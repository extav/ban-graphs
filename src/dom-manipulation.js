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

  const h1 = document.createElement("h1");
  h1.textContent = "Bracket About Nothing";
  main.appendChild(h1);

  const fig = document.createElement("figure");
  fig.textContent = "Graph will be here";
  main.appendChild(fig);

  document.body.appendChild(main);

  // config section
  const configSection = document.createElement("section");
  configSection.id = "config";
  configSection.append(createPlayerSelectionBar());
  const submitButton = document.createElement("button");
  submitButton.textContent = "Generate";
  submitButton.type = "button";
  submitButton.id = "graph-button";
  submitButton.onclick = clickButtonGraph;
  configSection.appendChild(submitButton);

  document.body.appendChild(configSection);

  fig.innerHTML = "";
  graphFromUserID(fig, main.dataObject, 1894586, "Extav");
}

function clearGraph() {
  const fig = document.querySelector("figure");
  fig.innerHTML = "";
}

function clickButtonGraph() {
  clearGraph();
  const box = document.querySelector("#player-selection-bar");
  const name = box.options[box.selectedIndex].textContent;
  const uid = parseInt(document.querySelector("#player-selection-bar").value);
  const fig = document.querySelector("figure");
  const dataObj = document.querySelector("main").dataObject;
  graphFromUserID(fig, dataObj, uid, name);

  console.log(box.options[box.selectedIndex].textContent);
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
  return playerSelectionBar;
}

export { createPageStructure };
