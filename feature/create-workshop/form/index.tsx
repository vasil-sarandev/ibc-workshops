import { Select, Textfield, useSnackbar } from "@components";
import { AccountProgram, AccountType, WorkshopDay } from "@models";
import { Button } from "@mui/material";
import { STATIC_ROUTES } from "@util";
import { createWorkshop } from "assets/firebase";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
import {
  accountProgramOptions,
  accountTypeOptionsCreateWorkshop,
  workshopDayOptions,
} from "shared";

interface Props {}

interface EmptyFormState {
  name: undefined;
  description: undefined;
  capacity: undefined;
  day: undefined;
  accountPrograms: AccountProgram[];
  accountTypes: AccountType[];
}

export type FormState = {
  name: string;
  description: string;
  capacity: number;
  day: WorkshopDay;
  accountPrograms: AccountProgram[];
  accountTypes: AccountType[];
};

export const CreateWorkshopForm: FC<Props> = () => {
  const router = useRouter();
  const { setMessage } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<FormState | EmptyFormState>({
    name: undefined,
    description: undefined,
    capacity: undefined,
    day: undefined,
    accountPrograms: [],
    accountTypes: [],
  });
  const handleFieldChange = (which: string) => (val: any) => {
    setState((prevState) => ({ ...prevState, [which]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      // form behavior won't allow an empty form to be submitted.
      await createWorkshop(state as FormState);
      setLoading(false);
      setMessage("Workshop has been created successfully.");
      router.push(STATIC_ROUTES.admin.href);
    } catch (e) {
      setMessage("Възникна грешка. моля опитайте по-късно.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textfield
        label="Name"
        value={state.name}
        onChange={handleFieldChange("name")}
        required
      />
      <Textfield
        label="Description"
        value={state.description}
        onChange={handleFieldChange("description")}
        required
      />
      <Textfield
        label="Capacity"
        value={state.capacity}
        onChange={handleFieldChange("capacity")}
        required
        type="number"
      />
      <Select
        options={workshopDayOptions}
        value={state.day}
        onChange={handleFieldChange("day")}
        label="Day"
        name="workshop-day"
        required
      />
      <Select
        options={accountTypeOptionsCreateWorkshop}
        value={state.accountTypes}
        onChange={handleFieldChange("accountTypes")}
        label="Account Types"
        name="workshop-account-types"
        required
        multiple
      />

      <Select
        options={accountProgramOptions}
        value={state.accountPrograms}
        onChange={handleFieldChange("accountPrograms")}
        label="Account Programs"
        name="workshop-account-programs"
        required
        multiple
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
