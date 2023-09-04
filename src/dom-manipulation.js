import "./style.css";
import data from "./testobj.json";
import playerData from "./ban37players.json";
import {
  onlyBeginners,
  genUserIdObject,
  createUserArrays,
  sortArraysbyArray,
  graphFromUserID,
  statpageGraphFromUserID,
} from "./plotly-testing";

import StatOverlay from "./Statscreen-resized.svg";
import { getPlayersFromSlug } from "./startggquery";

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

async function createStreamStatpageStructure() {
  const content = document.createElement("div");
  content.classList.add("sp-content");
  content.dataObject = onlyBeginners(data);
  content.dataUserArray = createUserArrays(content.dataObject)[0];

  const controls = document.createElement("div");
  controls.classList.add("sp-controls");

  const overlay = document.createElement("div");
  overlay.classList.add("sp-overlay");
  overlay.style.backgroundImage = `url(${StatOverlay})`;
  // const img = document.createElement("img");
  // img.src = StatOverlay;
  // overlay.appendChild(img);

  // ----- Manage the Top Bar ----- //
  const vsText = document.createElement("div");
  vsText.id = "vsText";
  vsText.textContent = "VS";
  overlay.appendChild(vsText);

  const p1name = document.createElement("div");
  p1name.id = "sp-p1name";
  p1name.textContent = "ExTav";
  overlay.appendChild(p1name);

  const p2name = document.createElement("div");
  p2name.id = "sp-p2name";
  p2name.textContent = "BAN | Cyxie";
  overlay.appendChild(p2name);

  // ----- Manage the Content Areas ----- //
  const p1area = document.createElement("div");
  p1area.id = "sp-p1area";
  // make the first stat-item
  let component = document.createElement("div");
  component.classList.add("sp-stat-item");
  let compHeader = document.createElement("h1");
  compHeader.textContent = "BANs Competed";
  component.appendChild(compHeader);
  let compValue = document.createElement("h2");
  compValue.textContent = "500";
  component.appendChild(compValue);
  p1area.appendChild(component);
  // make the second stat-item
  component = document.createElement("div");
  component.classList.add("sp-stat-item");
  compHeader = document.createElement("h1");
  compHeader.textContent = "Best Placement";
  component.appendChild(compHeader);
  compValue = document.createElement("h2");
  compValue.textContent = "250";
  component.appendChild(compValue);
  p1area.appendChild(component);
  // make the area for a graph
  const graphArea = document.createElement("div");
  graphArea.id = "sp-p1graph";
  p1area.appendChild(graphArea);

  const p1NewChallenger = document.createElement("div");
  p1NewChallenger.textContent = "A NEW CHALLENGER APPROACHES";
  p1NewChallenger.style.display = "none";
  p1area.appendChild(p1NewChallenger);

  overlay.appendChild(p1area);

  // make p2 area
  const p2area = document.createElement("div");
  p2area.id = "sp-p2area";
  // make the first stat-item
  component = document.createElement("div");
  component.classList.add("sp-stat-item");
  compHeader = document.createElement("h1");
  compHeader.textContent = "BANs Competed";
  component.appendChild(compHeader);
  compValue = document.createElement("h2");
  compValue.textContent = "500";
  component.appendChild(compValue);
  p2area.appendChild(component);
  // make the second stat-item
  component = document.createElement("div");
  component.classList.add("sp-stat-item");
  compHeader = document.createElement("h1");
  compHeader.textContent = "Best Placement";
  component.appendChild(compHeader);
  compValue = document.createElement("h2");
  compValue.textContent = "250";
  component.appendChild(compValue);
  p2area.appendChild(component);
  // make the area for a graph
  const graphArea2 = document.createElement("div");
  graphArea2.id = "sp-p2graph";
  p2area.appendChild(graphArea2);

  const p2NewChallenger = document.createElement("div");
  p2NewChallenger.textContent = "A NEW CHALLENGER APPROACHES";
  p2NewChallenger.style.display = "none";
  p2area.appendChild(p2NewChallenger);

  overlay.appendChild(p2area);

  // ----- Create the Controls area Below ----- //

  // controls.dataPlayersObj = await getPlayersFromSlug(
  //   "tournament/bracket-about-nothing-37-beginners-only-ggst/event/ggst-singles"
  // );
  controls.dataPlayersObj = playerData;

  const p1box = document.createElement("div");
  p1box.id = "sp-p1box";
  p1box.textContent = "PICK SOMETHING";
  const p1chooseRegion = document.createElement("div");
  p1chooseRegion.id = "sp-p1choose";
  populatePlayerChooseRegion(controls.dataPlayersObj, p1chooseRegion, p1box);

  const p2box = document.createElement("div");
  p2box.id = "sp-p2box";
  p2box.textContent = "PICK SOMETHING";
  const p2chooseRegion = document.createElement("div");
  p2chooseRegion.id = "sp-p2choose";
  populatePlayerChooseRegion(controls.dataPlayersObj, p2chooseRegion, p2box);

  const updateButton = document.createElement("button");
  updateButton.id = "statpage-update-button";
  updateButton.textContent = "Update";
  updateButton.onclick = buttonStatpageRefresh;

  controls.appendChild(p1chooseRegion);
  controls.appendChild(p1box);
  controls.appendChild(updateButton);
  controls.appendChild(p2box);
  controls.appendChild(p2chooseRegion);

  content.appendChild(overlay);
  content.appendChild(controls);
  document.body.appendChild(content);
}

function updateStatpageHalf(spot) {
  const name = document.querySelector(`#sp-p${spot}box`).textContent;
  const uid = parseInt(document.querySelector(`#sp-p${spot}box`).value);
  const graph = document.querySelector(`#sp-p${spot}graph`);
  const dataObj = document.querySelector(".sp-content").dataObject;

  if (!document.querySelector(".sp-content").dataUserArray.includes(`${uid}`)) {
    document.querySelector(`#sp-p${spot}name`).textContent = name;
    document.querySelector(`#sp-p${spot}area`).children[0].style.display =
      "none";
    document.querySelector(`#sp-p${spot}area`).children[1].style.display =
      "none";
    document.querySelector(`#sp-p${spot}area`).children[2].style.display =
      "none";
    document.querySelector(`#sp-p${spot}area`).children[3].style.display =
      "flex";
    return;
  }

  document.querySelector(`#sp-p${spot}area`).children[0].style.display =
    "flex";
  document.querySelector(`#sp-p${spot}area`).children[1].style.display =
    "flex";
  document.querySelector(`#sp-p${spot}area`).children[2].style.display =
    "flex";
  document.querySelector(`#sp-p${spot}area`).children[3].style.display = "none";
  const [numCompeted, bestPlacement] = statpageGraphFromUserID(
    graph,
    dataObj,
    uid,
    name
  );
  document.querySelector(`#sp-p${spot}name`).textContent = name;
  document.querySelector(
    `#sp-p${spot}area`
  ).children[0].children[1].textContent = numCompeted;
  document.querySelector(
    `#sp-p${spot}area`
  ).children[1].children[1].textContent = bestPlacement;
}

// function buttonStatpageRefresh() {
//   // --- player 1
//   const p1name = document.querySelector("#sp-p1box").textContent;
//   const p1Uid = parseInt(document.querySelector("#sp-p1box").value);
//   const p1graph = document.querySelector("#sp-p1graph");
//   const dataObj = document.querySelector(".sp-content").dataObject;
//   // console.log(document.querySelector(".sp-controls"));

//   const [p1numCompeted, p1bestPlacement] = statpageGraphFromUserID(
//     p1graph,
//     dataObj,
//     p1Uid,
//     p1name
//   );
//   // console.log(p1numCompeted);
//   document.querySelector("#sp-p1name").textContent = p1name;
//   document.querySelector("#sp-p1area").children[0].children[1].textContent =
//     p1numCompeted;
//   document.querySelector("#sp-p1area").children[1].children[1].textContent =
//     p1bestPlacement;

//   // --- player 2
//   const p2name = document.querySelector("#sp-p2box").textContent;
//   const p2Uid = parseInt(document.querySelector("#sp-p2box").value);
//   const p2graph = document.querySelector("#sp-p2graph");
//   // const dataObj = document.querySelector(".sp-content").dataObject;
//   // console.log(document.querySelector(".sp-controls"));

//   const [p2numCompeted, p2bestPlacement] = statpageGraphFromUserID(
//     p2graph,
//     dataObj,
//     p2Uid,
//     p2name
//   );
//   console.log(p1numCompeted);
//   document.querySelector("#sp-p2name").textContent = p2name;
//   document.querySelector("#sp-p2area").children[0].children[1].textContent =
//     p2numCompeted;
//   document.querySelector("#sp-p2area").children[1].children[1].textContent =
//     p2bestPlacement;
// }

function buttonStatpageRefresh() {
  updateStatpageHalf(1);
  updateStatpageHalf(2);
}

function populatePlayerChooseRegion(playerObj, region, target) {
  const keys = Object.keys(playerObj)
  const names = keys.map((k) => playerObj[k]);

  const [sortedKeys, sortedNames] = sortArraysbyArray(names, [keys, names])
  
  // Object.keys(playerObj).map((k) => {
  //   const nameRegion = document.createElement("div");
  //   nameRegion.classList.add("player-select-name");
  //   nameRegion.textContent = playerObj[k];
  //   nameRegion.dataUid = k;
  //   nameRegion.dataTarget = target;

  //   nameRegion.addEventListener("click", modifyPlayerBox);
  //   region.appendChild(nameRegion);
  // });
  sortedKeys.map((k, i) => {
    const nameRegion = document.createElement("div");
    nameRegion.classList.add("player-select-name");
    nameRegion.textContent = sortedNames[i];
    nameRegion.dataUid = sortedKeys[i];
    nameRegion.dataTarget = target;

    nameRegion.addEventListener("click", modifyPlayerBox);
    region.appendChild(nameRegion);
  });
}

function modifyPlayerBox(e) {
  // this.target.textContent = this.textContent;
  e.target.dataTarget.textContent = e.target.textContent;
  e.target.dataTarget.value = e.target.dataUid;

  // this.target.value = this.dataUid;
}

export { createPageStructure, fillInfoSection, createStreamStatpageStructure };
