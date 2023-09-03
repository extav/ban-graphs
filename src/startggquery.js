const auth = "Bearer 6f3d90e274540c588150d27a9aa8739a";

async function getEventIdsFromOwner(oID) {
  // Run the query
  const eventHolder = {};

  return fetch("https://api.start.gg/gql/alpha", {
    method: "POST",
    headers: {
      Authorization: auth,
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query:
        "query eventIDS($ownerID:ID!) {tournaments(query: {page: 1, perPage: 500, filter: {ownerId: $ownerID}}) {nodes { name id events{id}}}}",
      // "query EventQuery($slug:String) {event(slug: $slug) {id name}}",
      variables: {
        ownerID: oID,
      },
    }),
  })
    .then((r) => {
      // console.log(r);
      return r.json();
    })
    .then((data) => {
      Array.from(data.data["tournaments"].nodes).map((e) => {
        if (e.events.length === 0) {
          return;
        }
        const eid = e.events[0].id;
        eventHolder[eid] = {
          name: e.name,
        };
      });

      return eventHolder;
    });
}

async function getDataFromSpecificEvents(eID) {
  const eventHolder = {};
  return fetch("https://api.start.gg/gql/alpha", {
    method: "POST",
    headers: {
      Authorization: auth,
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query:
        "query specificEvent($eid: ID) {event(id: $eid) { id, tournament{name}}}",
      // "query eventIDS($ownerID:ID!) {tournaments(query: {page: 1, perPage: 500, filter: {ownerId: $ownerID}}) {nodes { name id events{id}}}}",
      // "query EventQuery($slug:String) {event(slug: $slug) {id name}}",
      variables: {
        eid: eID,
        // slug: eventSlug,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      eventHolder[eID] = {
        name: data.data.event.tournament.name,
      }; //.data.event.tournament.name;
      return eventHolder;
    });
}

async function getDataFromEventIds(eventID) {
  const eventData = {};
  const playersArray = [];
  return fetch("https://api.start.gg/gql/alpha", {
    method: "POST",
    headers: {
      Authorization: auth,
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query:
        "query eidQuery($eid: ID) {event(id: $eid) { startAt numEntrants entrants(query: {page: 1, perPage: 500}) {nodes { name standing{placement} participants{user{id}}}}}}",
      // "query eventIDS($ownerID:ID!) {tournaments(query: {page: 1, perPage: 500, filter: {ownerId: $ownerID}}) {nodes { name id events{id}}}}",
      // "query EventQuery($slug:String) {event(slug: $slug) {id name}}",
      variables: {
        // ownerID: oID,
        // slug: eventSlug,
        eid: eventID,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      // console.log(data.data);
      eventData["startAt"] = data.data.event.startAt;
      eventData["numPlayers"] = data.data.event.numEntrants;
      data.data.event.entrants.nodes.map((e) => {
        // check that the player actually has a standing
        // later, perhaps recount numPlayers using only created players
        if (e.standing === null) {
          // console.log("CAUGHT A PLAYER HERE:" + e.name)
          return;
        }

        const playerObj = {};
        playerObj["name"] = e.name;
        playerObj["userID"] = e.participants[0].user.id;
        playerObj["placement"] = e.standing.placement;
        playersArray.push(playerObj);
      });
      eventData["players"] = playersArray;
      // return data.data;
      return eventData;
    });
}

async function fillEventHolderWithData(eventHolder) {
  const eventIds = Object.keys(eventHolder); // .slice(0, 8); // temporarily limit to 4 events
  // console.log(eventIds);
  eventIds.map(async function (id) {
    // console.log(id);
    const eventData = await getDataFromEventIds(id);
    // console.log(eventData);
    const eventDataKeys = Object.keys(eventData);
    eventDataKeys.map((k) => {
      eventHolder[id][k] = eventData[k];
    });
  });
  return eventHolder;
}

export {
  getEventIdsFromOwner,
  getDataFromEventIds,
  fillEventHolderWithData,
  getDataFromSpecificEvents,
};
