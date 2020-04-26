import { Oparl } from "./index";
import { Person, AgendaItem, Body, Meeting, ExternalList } from "./types";

const oparl = new Oparl({
  entrypoint: "https://www.muenchen-transparent.de/oparl/v1.0",
  // limit: {
  //   maxRequests: 5,
  //   perMilliseconds: 1000,
  // },
  // withCache: true,
});

(async () => {
  // let endpoints = await Oparl.getEndpoints();
  // console.log(endpoints);

  let endpoints = await Oparl.getEndpoints();
  console.log(endpoints.next);
  console.log(endpoints.meta);
  while (endpoints.next) {
    endpoints = await endpoints.next().then((data) => {
      console.log(data.meta);
      return data;
    });
  }

  // let system = await oparl.getSystem();
  // console.log(system);

  // let bodies = await oparl.getBodies();
  // console.log(bodies);

  // const bodies = await oparl.bodies;
  // const r = bodies.map(async (body) => {
  //   let organizuations = await oparl.getOrganizations(body);
  //   console.log({ organizuations });
  //   // while (organizuations?.next) {
  //   //   organizuations = await organizuations.next();
  //   //   console.log(organizuations);
  //   // }
  // });

  // await Promise.all(r);

  // const body = await oparl.body;
  // console.log(body);

  // let organizuations = await oparl.getOrganizations();
  // console.log(organizuations);
  // while (organizuations?.next) {
  //   organizuations = await organizuations.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let meetings = await oparl.getMeetings();
  // console.log(meetings);
  // while (meetings?.next) {
  //   meetings = await meetings.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let locations = await oparl.getLocations();
  // console.log(locations);
  // while (locations?.next) {
  //   locations = await locations.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let persons = await oparl.getPersons();
  // console.log(persons);
  // while (persons?.next) {
  //   persons = await persons.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let files = await oparl.getFiles();
  // console.log(files);
  // while (files?.next) {
  //   files = await files.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let papers = await oparl.getPapers();
  // console.log(papers);
  // while (papers?.next) {
  //   papers = await papers.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let legislativeTermList = await oparl.getLegislativeTerms();
  // console.log(legislativeTermList);
  // while (legislativeTermList?.next) {
  //   legislativeTermList = await legislativeTermList.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let agendaItems = await oparl.getAgendaItems();
  // console.log(agendaItems);
  // while (agendaItems?.next) {
  //   agendaItems = await agendaItems.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let consultations = await oparl.getConsultations();
  // console.log(consultations);
  // while (consultations?.next) {
  //   consultations = await consultations.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  // let memberships = await oparl.getMemberships();
  // console.log(memberships);
  // while (memberships?.next) {
  //   memberships = await memberships.next().then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // }

  process.exit(0);
})();
