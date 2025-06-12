import { QueryTypes } from "./QueryTypes";

export interface EventTypes {
  id: string;
  title: string;
  fromDate: string;
  toDate: string;
  description: string;
}

export interface GetEventsTypes extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  page?: number;
  pageSize?: number;
  id?: string;
}

export interface AddEventTypes extends QueryTypes {
  setAddEventChange: ()=> void,
  setIsSuccess: (state: boolean) => void;
  title: string;
  description: string;
  fromDate: string;
  toDate: string;
}


export interface DeleteEventTypes extends QueryTypes {
  setAddEventChange: ()=> void,
  setIsSuccess: (state: boolean) => void;
  id: string
}