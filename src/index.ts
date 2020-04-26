import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { Api, ApiOptions } from "./Api";
import {
  Body,
  File,
  ExternalList,
  Meeting,
  Paper,
  AgendaItem,
  Organization,
  Membership,
  Person,
  LegislativeTerm,
  isExternalList,
  Location,
  Consultation,
  EndpointList,
  isEndpointList,
  System,
  Endpoint,
} from "./types";

interface OparlOptions extends ApiOptions {
  entrypoint: string;
}

export type DataTypes =
  | Body
  | Organization
  | ExternalList<Organization>
  | EndpointList
  | Location
  | ExternalList<Location>
  | Membership
  | Person
  | Meeting
  | ExternalList<Meeting>
  | File
  | Paper
  | LegislativeTerm
  | AgendaItem;

class Oparl extends Api {
  private _entrypoint: string;
  private _system?: System;
  private _bodies: Body[] = [];

  constructor(options: OparlOptions, config?: AxiosRequestConfig) {
    super(options, config);

    this._entrypoint = options.entrypoint;
  }

  public get entrypoint() {
    return this._entrypoint;
  }

  public get system() {
    return (async () => {
      if (!this._system) {
        return await this.getSystem().then((system) => {
          this._system = system;
          return system;
        });
      }
      return this._system;
    })();
  }

  public get bodies() {
    return (async () => {
      if (!this._bodies || this._bodies.length === 0) {
        return await this.getBodies().then(async (bodies) => {
          if (!bodies) {
            throw new Error("Error: Cant load bodies");
          }
          this._bodies = [...this._bodies, ...bodies.data];
          let nextBodies = bodies;
          while (nextBodies.next) {
            nextBodies = await nextBodies.next();
            this._bodies = [...this._bodies, ...nextBodies.data];
          }
          return this._bodies;
        });
      }
      return this._bodies;
    })();
  }

  public static getEndpoints = () => {
    const oparl = new Oparl({ entrypoint: "" }); // TODO handle unnecessary entrypoint option
    return oparl.getData<EndpointList>(
      "https://dev.oparl.org/api/endpoints?page=1&limit=25"
    );
  };

  public getData = <T extends DataTypes>(url: string) => {
    return super.get<T>(url || this.entrypoint).then(({ data }) => {
      if (isExternalList(data)) {
        const { first, prev, self, next, last } = data.links;
        const helpers = {
          first:
            first && self !== first ? () => this.getData<T>(first) : undefined,
          prev: prev && self !== prev ? () => this.getData<T>(prev) : undefined,
          next: next && self !== next ? () => this.getData<T>(next) : undefined,
          last: last && self !== last ? () => this.getData<T>(last) : undefined,
        };
        return {
          ...data,
          ...helpers,
        };
      }
      if (isEndpointList(data)) {
        const { next } = data.meta;
        const helpers = {
          next: next ? () => this.getData<T>(next) : undefined,
        };
        return {
          ...data,
          ...helpers,
        };
      }
      return data;
    });
  };

  public getSystem = async () => {
    if (this._system) {
      return this._system;
    }
    return this.getData<System>(this.entrypoint).then((system) => {
      this._system = system;
      return system;
    });
  };

  public getBodies = () => {
    return this.system.then(async (data) => {
      if (data.body) {
        return this.getData<ExternalList<Body>>(data.body);
      }
    });
  };

  public getOrganizations = (body: Body) => {
    if (body.organization) {
      return this.getData<ExternalList<Organization>>(body.organization);
    }
  };

  public getMeetings = (body: Body) => {
    if (body.meeting) {
      return this.getData<ExternalList<Meeting>>(body.meeting);
    }
  };

  public getLocations = (body: Body) => {
    if (body.locationList) {
      return this.getData<ExternalList<Location>>(body.locationList);
    }
  };

  public getPersons = (body: Body) => {
    if (body.person) {
      return this.getData<ExternalList<Person>>(body.person);
    }
  };

  public getFiles = (body: Body) => {
    if (body.file) {
      return this.getData<ExternalList<File>>(body.file);
    }
  };

  public getPapers = (body: Body) => {
    if (body.paper) {
      return this.getData<ExternalList<Paper>>(body.paper);
    }
  };

  public getLegislativeTerms = (body: Body) => {
    if (body.legislativeTermList) {
      return this.getData<ExternalList<LegislativeTerm>>(
        body.legislativeTermList
      );
    }
  };

  public getAgendaItems = (body: Body) => {
    if (body.agendaItem) {
      return this.getData<ExternalList<AgendaItem>>(body.agendaItem);
    }
  };

  public getConsultations = (body: Body) => {
    if (body.consultation) {
      return this.getData<ExternalList<Consultation>>(body.consultation);
    }
  };

  public getMemberships = (body: Body) => {
    if (body.membership) {
      return this.getData<ExternalList<Membership>>(body.membership);
    }
  };
}

export { Oparl };
