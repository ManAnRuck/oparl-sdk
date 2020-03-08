type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export const API_BODY =
  "https://sdnetrim.kdvz-frechen.de/rim4883/webservice/oparl/v1.1/body/1";
// "https://ris.schwalmtal.de/webservice/oparl/v1.0/body/1";

export interface ExternalList<T> {
  data: T[];
  pagination: {
    totalElements: number;
    elementsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    self: string;
    last: string;
    prev?: string;
    next?: string;
  };
}
export interface Body {
  id: string;
  type: string;
  system?: string;
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
  organization: Organization[];
  person: Person[];
  meeting: Meeting[];
  paper: Paper[];
  legislativeTerm: LegislativeTerm[];
  agendaItem?: AgendaItem[];
  consultation?: any[];
  file?: File[];
  locationList?: any[];
  legislativeTermList?: any[];
  membership?: Membership[];
  classification?: string;
  location?: any;
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
  Body?: Body;
  name?: string;
  membership?: Membership[];
  meeting?: Meeting[];
  consultation?: any;
  shortName?: string;
  post?: string[];
  subOrganizationOf?: Organization;
  organizationType?: string;
  classification?: string;
  startDate?: string;
  endDate?: string;
  website?: string;
  location?: any;
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
  person?: Person;
  Organization?: Organization;
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
  Body?: Body;
  name?: string;
  familyName?: string;
  givenName?: string;
  formOfAddress?: string;
  affix?: string;
  title?: string[];
  gender?: string;
  phone?: string[];
  email?: string[];
  location?: any;
  locationObject?: any;
  status?: string[];
  membership?: Membership[];
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
  name?: string;
  meetingState?: string;
  cancelled?: boolean;
  start?: string;
  end?: string;
  location?: any;
  organization?: Organization[];
  participant?: Person[];
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
  body?: Body;
  name?: string;
  reference?: string;
  date?: string;
  paperType?: string;
  relatedPaper?: Paper[];
  superordinatedPaper?: Paper[];
  subordinatedPaper?: Paper[];
  mainFile?: File;
  auxiliaryFile?: File[];
  location?: any[];
  originatorPerson?: Person[];
  underDirectionOf?: Organization[];
  originatorOrganization?: Organization[];
  consultation?: any[];
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
  body?: Body;
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
  order: number;
  meeting?: Meeting;
  number?: string;
  name?: string;
  public?: boolean;
  consultation?: any;
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