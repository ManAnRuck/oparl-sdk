import { AxiosError } from "axios";

export * from "./typeGuards";

export type OparError = AxiosError;

export type ItemTypes =
  | Body
  | Organization
  | Location
  | Membership
  | Person
  | Meeting
  | File
  | Paper
  | LegislativeTerm
  | AgendaItem;

export interface EndpointList {
  data: Endpoint[];
  meta: {
    page: number;
    total: number;
    next: string;
  };
}
export interface Endpoint {
  id: number;
  url: string;
  osm?: number;
  wikidata?: string;
  title: string;
  description?: string;
  bodyCount?: number;
  fetched?: string;
  system: System;
}

export interface System {
  id: string;
  type: string;
  oparlVersion: string;
  otherOparlVersions: string[]; // System
  license?: string;
  body: string;
  name: string;
  contactEmail: string;
  contactName: string;
  website: string;
  vendor: string;
  product: string;
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface ExternalList<T> {
  data: T[];
  pagination: {
    totalElements: number;
    elementsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first?: string;
    self?: string;
    last?: string;
    prev?: string;
    next: string;
  };
  first?: () => Promise<ExternalList<T>>;
  self?: () => Promise<ExternalList<T>>;
  last?: () => Promise<ExternalList<T>>;
  prev?: () => Promise<ExternalList<T>>;
  next: () => Promise<ExternalList<T>>;
}
export interface Body {
  id: string;
  type: string;
  system?: string;
  shortName?: string;
  name: string;
  website?: string;
  license?: string;
  licenseValidSince?: string;
  oparlSince?: string;
  ags?: string;
  rgs?: string;
  equivalent?: string[];
  contactEmail?: string;
  contactName?: string;
  organization: string;
  person: string;
  meeting: string;
  paper: string; // Paper ExternalList
  legislativeTerm: LegislativeTerm[];
  agendaItem?: string; // AgendaItem ExternalList
  consultation?: string; // Consultation ExternalList
  file?: string;
  locationList?: string;
  legislativeTermList?: string; // LegislativeTerm ExternalList
  membership?: string; // Membership ExternalList
  classification?: string;
  location?: Location;
  mainOrganization?: Organization;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}
export interface Organization {
  id: string;
  type: string;
  body?: string | Body;
  name?: string;
  membership?: Membership[];
  meeting?: Meeting[];
  consultation?: Consultation;
  shortName?: string;
  post?: string[];
  subOrganizationOf?: Organization;
  organizationType?: string;
  classification?: string;
  startDate?: string;
  endDate?: string;
  website?: string;
  location?: Location;
  externalBody?: Body;
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface Membership {
  id: string;
  type: string;
  person?: string; // Person
  organization?: string; //Organization
  role?: string;
  votingRight?: boolean;
  startDate?: string;
  endDate?: string;
  onBehalfOf?: Organization;
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface Person {
  id: string;
  type: string;
  body?: string; // Body id url
  name?: string;
  familyName?: string;
  givenName?: string;
  formOfAddress?: string;
  affix?: string;
  title?: string[];
  gender?: string;
  phone?: string[];
  email?: string[];
  location?: string; // Location id
  locationObject?: any;
  status?: string[];
  membership?: string[]; // Membership id urls
  image?: any;
  life?: string;
  lifeSource?: string;
  license?: string;
  keyword?: string[];
  created?: any;
  modified?: any;
  web?: string;
  deleted?: boolean;
}

export interface Meeting {
  id: string;
  type: string;
  body?: string | Body;
  name?: string;
  meetingState?: string;
  cancelled?: boolean;
  start?: string;
  end?: string;
  location?: Location;
  organization?: string[]; // ids of Organization
  participant?: string[]; // Person ids
  invitation?: File;
  resultsProtocol?: File;
  verbatimProtocol?: File;
  auxiliaryFile?: File[];
  agendaItem?: any[];
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface File {
  id: string;
  body: string;
  type: string;
  accessUrl: string;
  name?: string;
  fileName?: string;
  mimeType?: string;
  date?: string;
  size?: number;
  sha1Checksum?: string;
  sha512Checksum?: string;
  text?: string;
  downloadUrl?: string;
  externalServiceUrl?: string;
  masterFile?: File;
  derivativeFile?: File[];
  fileLicense?: string;
  meeting?: Meeting[];
  agendaItem?: any[];
  person?: Person;
  paper?: any[];
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface Paper {
  id: string;
  type: string;
  name?: string;
  body?: string;
  reference?: string;
  date?: string;
  paperType?: string;
  relatedPaper?: Paper[];
  superordinatedPaper?: Paper[];
  subordinatedPaper?: Paper[];
  mainFile?: File;
  auxiliaryFile?: File[];
  location?: Location[];
  originatorPerson?: Person[];
  underDirectionOf?: Organization[];
  originatorOrganization?: Organization[];
  consultation?: Consultation[];
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface LegislativeTerm {
  id: string;
  type: string;
  body?: string; // Body id
  name?: string;
  startDate?: string;
  endDate?: string;
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface AgendaItem {
  id: string;
  type: string;
  body?: string; // Body id
  order: number;
  meeting?: string; // Meeting id
  number?: string;
  name?: string;
  public?: boolean;
  consultation?: Consultation;
  result?: string;
  resolutionText?: string;
  resolutionFile?: File;
  auxiliaryFile?: File[];
  start?: string;
  end?: string;
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface Location {
  id: string;
  type: string;
  description?: string;
  geojson?: any;
  streetAddress?: string;
  room?: string;
  postalCode?: string;
  subLocality?: string;
  locality?: string;
  bodies?: string[];
  organizations?: Organization[] | string[];
  persons?: Person[] | string[];
  meetings?: Meeting[] | string[];
  papers?: Paper[] | string[];
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}

export interface Consultation {
  id: string;
  type: string;
  paper?: string; // Paper
  agendaItem?: string; // AgendaItem
  meeting?: string; // Meeting
  organization?: string[]; // Organizations
  authoritative?: boolean;
  role?: string;
  license?: string;
  keyword?: string[];
  created?: string;
  modified?: string;
  web?: string;
  deleted?: boolean;
}
