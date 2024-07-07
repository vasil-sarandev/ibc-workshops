export type AccountType = "ACTIVE" | "PASSIVE" | "JUNIOR" | "PHARMACY_PASSIVE";

export type AccountProgram = "MEDICINE" | "DENTAL" | "PHARMACY" | "OTHER";

export type AbstractStatus = "ACCEPTED" | "SUBMITTED" | "DEFAULT" | "REJECTED";

export type AccountUniversity =
  | "Medical University"
  | "Sofia University"
  | "Other";

export type UserDetails = {
  name: string;
  age: number;
  country: string;
  phone: string;
  program: AccountProgram;
  university: AccountUniversity;
  academicYear: number;
  email: string;
};

export type AbstractDetails = {
  author: string;
  title: string;
  introduction: string;
  methods: string;
  results: string;
  conclusion: string;
};

export type User = {
  type: AccountType;
  paid: boolean;
  status: AbstractStatus;
  details: UserDetails;
  abstract?: AbstractDetails;
  attending: boolean;
};
