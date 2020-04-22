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
} from "./types";

interface OparlOptions extends ApiOptions {
  entrypoint: string;
}

export type DataTypes =
  | Body
  | Organization
  | ExternalList<Organization>
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
  private _body?: Body;

  constructor(options: OparlOptions, config?: AxiosRequestConfig) {
    super(options, config);

    this._entrypoint = options.entrypoint;
  }

  public get entrypoint() {
    return this._entrypoint;
  }

  private get system() {
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

  public get body() {
    return (async () => {
      if (!this._body) {
        return await this.getBodies().then((body) => {
          if (!body) {
            throw new Error("Error: Cant load body");
          }
          this._body = body?.data[0];
          return this._body;
        });
      }
      return this._body;
    })();
  }

  public static getEndpoints = () => {
    return Axios.get<EndpointList>("https://dev.oparl.org/api/endpoints").then(
      ({ data }) => data.data
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

  public getOrganizations = () => {
    return this.body.then(async (data) => {
      if (data.organization) {
        return this.getData<ExternalList<Organization>>(data.organization);
      }
    });
  };

  public getMeetings = () => {
    return this.body.then(async (data) => {
      if (data.meeting) {
        return this.getData<ExternalList<Meeting>>(data.meeting);
      }
    });
  };

  public getLocations = () => {
    return this.body.then(async (data) => {
      if (data.locationList) {
        return this.getData<ExternalList<Location>>(data.locationList);
      }
    });
  };

  public getPersons = () => {
    return this.body.then(async (data) => {
      if (data.person) {
        return this.getData<ExternalList<Person>>(data.person);
      }
    });
  };

  public getFiles = () => {
    return this.body.then(async (data) => {
      if (data.file) {
        return this.getData<ExternalList<File>>(data.file);
      }
    });
  };

  public getPapers = () => {
    return this.body.then(async (data) => {
      if (data.paper) {
        return this.getData<ExternalList<Paper>>(data.paper);
      }
    });
  };

  public getLegislativeTerms = () => {
    return this.body.then(async (data) => {
      if (data.legislativeTermList) {
        return this.getData<ExternalList<LegislativeTerm>>(
          data.legislativeTermList
        );
      }
    });
  };

  public getAgendaItems = () => {
    return this.body.then(async (data) => {
      if (data.agendaItem) {
        return this.getData<ExternalList<AgendaItem>>(data.agendaItem);
      }
    });
  };

  public getConsultations = () => {
    return this.body.then(async (data) => {
      if (data.consultation) {
        return this.getData<ExternalList<Consultation>>(data.consultation);
      }
    });
  };

  public getMemberships = () => {
    return this.body.then(async (data) => {
      if (data.membership) {
        return this.getData<ExternalList<Membership>>(data.membership);
      }
    });
  };
}

export { Oparl };
