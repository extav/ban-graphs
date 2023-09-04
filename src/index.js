// import Plotly from "plotly.js-dist";
import {
  fillEventHolderWithData,
  getDataFromEventIds,
  getDataFromSpecificEvents,
  getEventIdsFromOwner,
} from "./startggquery";

// import { getSomeData } from "./data-grafting";

// import data from "./testobj.json";
import { testStuffOut } from "./plotly-testing";
import {
  createPageStructure,
  createStreamStatpageStructure,
  fillInfoSection,
} from "./dom-manipulation";

// here is what I used to get the object
// const eHolder = await getEventIdsFromOwner(1525697);
// const eHolderBan30 = await getDataFromSpecificEvents(912275);
// const eHolderBan35 = await getDataFromSpecificEvents(954247);
// const eHolderBan36 = await getDataFromSpecificEvents(962354);

// // console.log(eHolderBan30);
// eHolder[912275] = eHolderBan30[912275];
// eHolder[954247] = eHolderBan35[954247];
// eHolder[962354] = eHolderBan36[962354];

// console.log(eHolder);

// // console.log(eHolder);
// console.log(await fillEventHolderWithData(eHolder));
// console.log(data);

// console.log(data)

// testStuffOut();

// ----------- Creating the real page --------------
// console.log(await getDataFromSpecificEvents(912275))
// console.log(await getDataFromSpecificEvents(954247))
// console.log(await getDataFromSpecificEvents(962354))

if (document.title === "BAN Statpage") {
  console.log("running first option");
  createStreamStatpageStructure();
} else {
  console.log("running second option");
  createPageStructure();
  const infoText =
    "This is the result of a for-fun and for-learning project. I make no promises that things aren't broken, but maybe you can have some fun looking at the data like I have. I'll probably add features, pages, and general improvements over time to make it less scuffed. Or maybe I won't. Enjoy. -Extav";
  fillInfoSection("Information", infoText);
}
// getSomeData();
