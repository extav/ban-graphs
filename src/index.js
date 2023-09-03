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
import { createPageStructure } from "./dom-manipulation";

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

createPageStructure();

// getSomeData();
