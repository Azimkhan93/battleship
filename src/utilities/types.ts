export type InLoginObject = {
  type: string;
  data: string;
  id: number;
};

export type OutLoginDataObject = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type OutLoginObject = InLoginObject ;
export type InMessageObject = InLoginObject ;

