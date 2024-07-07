import { User, Workshop } from "@models";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { AvailableDays } from "../util";
import s from "./workshop.module.css";

interface Props extends Workshop {
  attemptSignUp: (id: string) => void;
  available: AvailableDays;
  user: User;
  userWorkshopsLength: number;
}

export const WorkshopItem: FC<Props> = ({
  name,
  description,
  day,
  attending,
  capacity,
  attemptSignUp,
  id,
  available,
  user,
  userWorkshopsLength,
}) => {
  const getShouldDisplaySignUpButton = (): boolean => {
    // TODO: maybe delete this later. it was asked for by Marto and it's too custom.
    if (user.details.program === "DENTAL" && userWorkshopsLength <= 2) {
      return true;
    }
    return available[day] === true && attending < capacity;
  };
  const shouldDisplaySignUpButton = getShouldDisplaySignUpButton();
  return (
    <Box mb={2}>
      <Card
        style={{
          flex: 1,
          height: "100%",
          padding: "20px 10px 20px 10px",
          background: "var(--yellow)",
          color: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={10} xs={12}>
            <div className={s.name}>{name}</div>
            <div className={s.description}>{description}</div>
          </Grid>
          <Grid item md={2} xs={12} className={s.right}>
            <div className={s.day}>{day}</div>
            <div className={s.attending}>
              {attending}/{capacity}
            </div>
          </Grid>
          <Grid item xs={12} className={s.actions}>
            {shouldDisplaySignUpButton && (
              <Button onClick={() => attemptSignUp(id)} variant="contained">
                Sign up
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
