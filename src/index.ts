import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./Api";
import { Body, API_BODY, File, ExternalList, Meeting, Paper, AgendaItem, Organization, Membership, Person } from "./types";

class Oparl extends Api {
    public constructor (config: AxiosRequestConfig) {
        super(config);
    }


    /**
     *
     * @param {object} credentials - user's identifications.
     * @param {string} credentials.email - user's email.
     * @param {string} credentials.password - user's password.
     * @returns {Promise<UserState>} userState - user information,
     */
    public body = (url?: string) => {
        console.log("API: body");
        // this.get<Body>(API_BODY).then(({data}) => console.log(data))
        return this.get<Body>(url || API_BODY).then(data => {
            console.log("API: body done")
            return data;
        });
    }

    public organization = (url: string) => {
        console.log("API: organization");
        // this.get<Organization>(url).then(({data}) => console.log(data))
        return this.get<Organization | ExternalList<Organization>>(url).then(data => {
            console.log("API: organization done")
            return data;
        });
    }

    public membership = (url: string) => {
        console.log("API: membership");
        // this.get<Membership>(url).then(({data}) => console.log(data))
        return this.get<Membership>(url).then(data => {
            console.log("API: membership done")
            return data;
        });
    }

    public person = (url: string) => {
        console.log("API: person");
        // this.get<Person>(url).then(({data}) => console.log(data))
        return this.get<Person | ExternalList<Person>>(url).then(data => {
            console.log("API: person done")
            return data;
        });
    }

    public meeting = (url: string) => {
        console.log("API: meeting");
        // this.get<ApiMeeting>(url).then(({data}) => console.log(data))
        return this.get<Meeting | ExternalList<Meeting>>(url).then(data => {
            console.log("API: meeting done")
            return data;
        });
    }

    public file = (url: string) => {
        console.log("API: file");
        // this.get<File>(url).then(({data}) => console.log(data))
        return this.get<File>(url).then(data => {
            console.log("API: file done")
            return data;
        });
    }

    public paper = (url: string) => {
        console.log("API: paper");
        // this.get<Paper>(url).then(({data}) => console.log(data))
        return this.get<Paper | ExternalList<Paper>>(url).then(data => {
            console.log("API: paper done")
            return data;
        });
    }

    public agendaItem = (url: string) => {
        console.log("API: agendaItem");
        // this.get<AgendaItem>(url).then(({data}) => console.log(data))
        return this.get<AgendaItem | ExternalList<AgendaItem>>(url).then(data => {
            console.log("API: agendaItem done")
            return data;
        });
    }
}

export {Oparl};