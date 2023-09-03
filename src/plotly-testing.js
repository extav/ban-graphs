// import data from "./testobj.json";
import Plotly from "plotly.js-dist";

// my uid 1894586
// const extavID = 1894586;
// mousewheel or two-finger scroll zooms the plot
// console.log(data);

function onlyBeginners(obj) {
  const newObj = {};
  const eids = Object.keys(obj);
  const regex1 = /beginner/i;
  const regex2 = /ggst/i;
  const eidsFiltered = eids.filter((id) => {
    return obj[id].name.search(regex1) >= 0 && obj[id].name.search(regex2) >= 0;
  });
  //   console.log(eids);
  //   console.log(eidsFiltered);
  eidsFiltered.map((id) => {
    newObj[id] = obj[id];
  });
  return newObj;
}

function getStartAt(obj) {
  const eids = Object.keys(obj);
  const startAtArray = [];
  eids.map((id) => {
    startAtArray.push(obj[id].startAt);
  });
  return startAtArray;
}

function getPlayerCount(obj) {
  const eids = Object.keys(obj);
  const numPlayersArray = [];
  eids.map((id) => {
    numPlayersArray.push(obj[id].numPlayers);
  });
  return numPlayersArray;
}

function getEventNames(obj) {
  const eids = Object.keys(obj);
  const eventNamesArray = [];
  eids.map((id) => {
    eventNamesArray.push(obj[id].name);
  });
  return eventNamesArray;
}

function genUserIdObject(obj) {
  const userIdObj = {};
  const eids = Object.keys(obj);
  eids.map((id) => {
    obj[id].players.map((player) => {
      if (!(player.userID in userIdObj)) {
        // console.log("adding " + player.name + "with key " + player.userID);
        userIdObj[player.userID] = [player.name];
        return;
      }
      if (!userIdObj[player.userID].includes(player.name)) {
        userIdObj[player.userID].push(player.name);
      }
    });
  });
  return userIdObj;
}

function createUserArrays(obj) {
  const userIdArray = [];
  const userNameArray = [];
  const userIdObj = genUserIdObject(obj);
  const userKeys = Object.keys(userIdObj);
  userKeys.map((k) => {
    userIdObj[k].map((name) => {
      userIdArray.push(k);
      userNameArray.push(name);
    });
  });
  return [userIdArray, userNameArray];
}

// const dataBeginner = onlyBeginners(data);
// console.log(dataBeginner);
// const eventIDs = Object.keys(dataBeginner);
// const nameData = getEventNames(dataBeginner);
// const startData = getStartAt(dataBeginner);
// const playerCountData = getPlayerCount(dataBeginner);

function sortArraysbyArray(sortingArray, arraysToSort) {
  // sorts lowest to highest, arraysToSort is an array of arrays
  const sortKeys = Object.keys(sortingArray);
  const sortedArrays = [];
  sortKeys.sort((a, b) => {
    return sortingArray[a] > sortingArray[b] ? 1 : -1;
  });
  arraysToSort.map((arr) => {
    sortedArrays.push(sortKeys.map((k) => arr[k]));
  });
  return sortedArrays;
}

// console.log([playerCountData, nameData]);
// console.log(sortArraysbyArray(playerCountData, [playerCountData, nameData]));
// const sortedArrays = sortArraysbyArray(startData, [
//   eventIDs,
//   nameData,
//   startData,
//   playerCountData,
// ]);

function getPlayerPlacements(obj, userID, eventIds) {
  // make sure eventIds is sorted before sending it in here
  const placementsArray = [];

  eventIds.map((eid) => {
    const eventPlacement = obj[eid].players.reduce((standing, p) => {
      // console.log("comparing " + p.userID + " to " + userID);
      if (p.userID !== userID) {
        return standing + 0;
      }
      // console.log("found 1");
      return standing + p.placement;
    }, 0);
    placementsArray.push(eventPlacement);
  });
  return placementsArray;
}

// console.log(getPlayerPlacements(dataBeginner, extavID, sortedArrays[0]));
// const extavPlacements = getPlayerPlacements(
//   dataBeginner,
//   extavID,
//   sortedArrays[0]
// );

function testStuffOut() {
  const newdiv = document.createElement("div");
  newdiv.id = "myDiv";
  document.body.appendChild(newdiv);

  const sharedX = Array.from(Array(playerCountData.length).keys());
  var trace1 = {
    // x: ["2020-10-04", "2021-11-04", "2023-12-04"],
    // y: [90, 40, 60],
    x: sharedX,
    y: playerCountData,
    type: "bar",
  };

  // make a second one graphing my progress

  //   console.log(extavPlacements)
  //   console.log(Array.from(extavPlacements.keys()))
  const attendedKeys = Array.from(extavPlacements.keys()).filter((k) => {
    if (extavPlacements[k] !== 0) {
      return true;
    }
  });

  var trace2 = {
    x: attendedKeys,
    y: attendedKeys.map((k) => {
      return playerCountData[k] - extavPlacements[k];
    }),
    type: "scatter",
  };

  // normal stuff below
  var data = [trace1, trace2];

  var layout = {
    title: "Scroll and Zoom",
    showlegend: false,
  };

  Plotly.newPlot("myDiv", data, layout, { staticPlot: true });
}

function calcNumAndPlacement(dataObj, uid) {}

function graphFromUserID(component, dataObj, uid, name) {
  console.log("Starting GFUID with uid " + uid);
  // console.log(dataObj);
  const playerCount = getPlayerCount(dataObj);
  const tourneyTimes = getStartAt(dataObj);
  const eventIds = Object.keys(dataObj);

  // could sort tourney times if needed here
  const [sortedPlayerCount, sortedEventIds] = sortArraysbyArray(tourneyTimes, [
    playerCount,
    eventIds,
  ]);
  const playerPlacements = getPlayerPlacements(dataObj, uid, sortedEventIds);

  let trace1 = {
    x: Array.from(sortedPlayerCount.keys()),
    y: sortedPlayerCount,
    type: "bar",
    width: 0.9,
    marker: {
      color: "black",
    },
  };

  // ugly create second part -------------
  const attendedKeys = Array.from(playerPlacements.keys()).filter((k) => {
    if (playerPlacements[k] !== 0) {
      return true;
    }
  });

  let trace2 = {
    x: attendedKeys,
    y: attendedKeys.map((k) => {
      return sortedPlayerCount[k] - playerPlacements[k];
    }),
    // type: "scatter",
    mode: "markers+text",
    marker: {
      size: 0.9 * 30,
      color: "#cd0024",
    },
    text: attendedKeys.map((k) => {
      return String(playerPlacements[k]);
    }),
    textposition: "inside",
    textfont: {
      color: "white",
      size: 20,
      // family: "Arial",
    },
  };
  // end ugly -----------

  let graphData = [trace1, trace2];

  let layout = {
    // title: "BAN Performance over Time: " + name,
    showlegend: false,
    font: {
      size: 24,
    },
    xaxis: {
      range: [-1, sortedPlayerCount.length],
      showticklabels: false,
      // title: {
      //   text: "All Ban Tournaments",
      // },
    },
    yaxis: {
      range: [0, Math.max(...sortedPlayerCount)],
      // title: {
      //   text: "Entrant Count",
      // },
    },
    paper_bgcolor: "#fcd720",
    plot_bgcolor: "#fcd720",
    margin: {
      l: 35,
      r: 0,
      t: 0,
      b: 0,
    },
    width: 900,
    height: 300,
  };

  Plotly.newPlot(component, graphData, layout, { staticPlot: true });

  const numCompeted = attendedKeys.length;
  const bestPlacement = Math.min(
    ...attendedKeys.map((k) => {
      return playerPlacements[k];
    })
  );
  return [numCompeted, bestPlacement];
}

export {
  testStuffOut,
  onlyBeginners,
  genUserIdObject,
  createUserArrays,
  sortArraysbyArray,
  graphFromUserID,
};
