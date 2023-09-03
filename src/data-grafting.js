import {
  getDataFromSpecificEvents,
  fillEventHolderWithData,
} from "./startggquery";

// ban 30

async function getSomeData() {
//   const eid = 912275; // ban 30
//   const eid = 954247; // ban 35
  const eid = 962354; // ban 36



  const eHolder = await getDataFromSpecificEvents(eid);
  console.log(await fillEventHolderWithData(eHolder));
}

export { getSomeData };
