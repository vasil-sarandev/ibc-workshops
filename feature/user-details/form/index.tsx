import { Select, Textfield, useSnackbar } from "@components";
import { FC, FormEvent, useState } from "react";
import { accountUniversityOptions } from "./util";
import { AccountProgram, AccountType, AccountUniversity, User } from "@models";
import s from "./user-details-form.module.css";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { setUserData } from "assets/firebase";
import { useRouter } from "next/router";
import { STATIC_ROUTES } from "@util";
import { accountProgramOptions, accountTypeOptions } from "shared";

export interface FormState {
  type: AccountType;
  name: string;
  age: number;
  country: string;
  academicYear: number;
  phone: string;
  university: AccountUniversity;
  program: AccountProgram;
}

interface EmptyFormState {
  type: undefined;
  name: undefined;
  age: undefined;
  country: undefined;
  academicYear: undefined;
  phone: undefined;
  university: undefined;
  program: undefined;
}

type FormKeys =
  | "type"
  | "name"
  | "age"
  | "country"
  | "academicYear"
  | "phone"
  | "university"
  | "program";

export const UserDetailsForm: FC = () => {
  const router = useRouter();
  const { user } = useAuth0();
  const { setMessage } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState | EmptyFormState>({
    type: undefined,
    name: undefined,
    age: undefined,
    country: undefined,
    academicYear: undefined,
    phone: undefined,
    university: undefined,
    program: undefined,
  });
  const changeField = (which: FormKeys) => (val: unknown) => {
    setFormState((prevState) => ({ ...prevState, [which]: val }));
  };
  const handleSubmit = async (e: FormEvent) => {
    // TODO: remove later
    setMessage(
      "Регистрациите са временно спряни. Моля свържете се с организаторите."
    );
    return;
    setLoading(true);
    e.preventDefault();

    try {
      // this is within a page with authenticationHOC component, formSubmit won't allow empty form to be submitted without required fields.
      await setUserData(
        user?.sub as string,
        user?.email as string,
        formState as FormState
      );
      router.push(STATIC_ROUTES.account.href);
    } catch (e) {
      setMessage("Възникна грешка. моля опитайте по-късно.");
    }
  };
  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <Select
          options={accountTypeOptions}
          value={formState.type}
          onChange={changeField("type")}
          label="Registration Type"
          name="type-select"
          required
        />
        <Textfield
          label="Full Name"
          value={formState.name}
          onChange={changeField("name")}
          required
        />
        <Textfield
          type="number"
          label="Age"
          value={formState.age}
          onChange={changeField("age")}
          required
        />
        <Textfield
          label="Phone Number"
          value={formState.phone}
          onChange={changeField("phone")}
          type="tel"
          required
        />
        <Textfield
          label="Country"
          value={formState.country}
          onChange={changeField("country")}
          required
        />
        <Select
          options={accountUniversityOptions}
          value={formState.university}
          onChange={changeField("university")}
          label="University"
          name="university-select"
          required
        />
        <Select
          options={accountProgramOptions}
          value={formState.program}
          onChange={changeField("program")}
          label="University Program"
          name="program-select"
          required
        />
        <Textfield
          label="Academic Year"
          value={formState.academicYear}
          onChange={changeField("academicYear")}
          type="number"
          required
        />
        {/* <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button> */}
        <Button type="submit" variant="contained" disabled={true}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </form>
    </div>
  );
};
