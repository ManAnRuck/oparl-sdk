import { ExternalList, Meeting, Organization } from ".";

export const isExternalList = (
  data: any
): data is ExternalList<Meeting | Organization> =>
  (data as ExternalList<any>).pagination !== undefined;
