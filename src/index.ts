import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance
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
  isExternalList
} from "./types";

interface OparlOptions extends ApiOptions {
  entrypoint: string;
}

type DataTypes =
  | Body
  | Organization
  | ExternalList<Organization>
  | Membership
  | Person
  | Meeting
  | ExternalList<Meeting>
  | File
  | Paper
  | LegislativeTerm
  | AgendaItem;

class Oparl extends Api {
  private entrypoint: string;

  constructor(options: OparlOptions, config?: AxiosRequestConfig) {
    super(options, config);

    this.entrypoint = options.entrypoint;
  }
  public getBody = () => {
    return this.getData<Body>(this.entrypoint);
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
          last: last && self !== last ? () => this.getData<T>(last) : undefined
        };
        return {
          ...data,
          ...helpers
        };
      }
      return data;
    });
  };

  public getMeetings = () => {
    return this.getBody().then(async data => {
      if (data.meeting) {
        return this.getData<ExternalList<Meeting>>(data.meeting);
      }
    });
  };

  public getOrganizations = () => {
    return this.getBody().then(async data => {
      if (data.organization) {
        return this.getData<ExternalList<Organization>>(data.organization);
      }
    });
  };
}

export { Oparl };
