import { AccountProgram, AccountType, WorkshopDay } from "@models";

type WorkshopDayOption = {
  label: WorkshopDay;
  value: WorkshopDay;
};

type AccountTypeOption = {
  label: string;
  value: AccountType;
};

type AccountProgramOptions = {
  label: AccountProgram;
  value: AccountProgram;
};
export const workshopDayOptions: WorkshopDayOption[] = [
  { label: "FRIDAY", value: "FRIDAY" },
  { label: "SATURDAY", value: "SATURDAY" },
  { label: "SUNDAY", value: "SUNDAY" },
];

export const accountTypeOptions: AccountTypeOption[] = [
  { label: "ACTIVE (40 €)", value: "ACTIVE" },
  { label: "PASSIVE (35 €)", value: "PASSIVE" },
  { label: "PHARMACY PASSIVE (25 €)", value: "PHARMACY_PASSIVE" },
  { label: "JUNIOR (0 €)", value: "JUNIOR" },
];

export const accountTypeOptionsCreateWorkshop: AccountTypeOption[] = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "PASSIVE", value: "PASSIVE" },
  { label: "PHARMACY PASSIVE", value: "PHARMACY_PASSIVE" },
  { label: "JUNIOR", value: "JUNIOR" },
];

export const accountProgramOptions: AccountProgramOptions[] = [
  { label: "MEDICINE", value: "MEDICINE" },
  { label: "DENTAL", value: "DENTAL" },
  { label: "PHARMACY", value: "PHARMACY" },
  { label: "OTHER", value: "OTHER" },
];
