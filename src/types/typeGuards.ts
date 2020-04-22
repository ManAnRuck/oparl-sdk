import { ExternalList, Meeting, Organization, EndpointList } from ".";

export const isExternalList = (
  data: any
): data is ExternalList<Meeting | Organization> =>
  (data as ExternalList<any>).pagination !== undefined;

export const isEndpointList = (data: any): data is EndpointList =>
  (data as EndpointList).meta !== undefined;
