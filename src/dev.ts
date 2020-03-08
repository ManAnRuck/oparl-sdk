import { Oparl } from "./index";
import { Person, AgendaItem, Body, Meeting, ExternalList } from "./types";

const oparl = new Oparl({
  entrypoint:
    "https://sdnetrim.kdvz-frechen.de/rim4883/webservice/oparl/v1.1/body/1",
  limit: {
    maxRequests: 5,
    perMilliseconds: 1000
  },
  withCache: true
});

(async () => {
  let meetings = await oparl.getMeetings();
  console.log(meetings);
  while (meetings?.next) {
    meetings = await meetings.next().then(data => {
      console.log(data);
      return data;
    });
  }

  let organizuations = await oparl.getOrganizations();
  console.log(organizuations);
  while (organizuations?.next) {
    organizuations = await organizuations.next().then(data => {
      console.log(data);
      return data;
    });
  }

  process.exit(0);
})();
