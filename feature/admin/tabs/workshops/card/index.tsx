import { AccountProgram, AccountType, Workshop } from "@models";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Card,
  Chip,
  ChipPropsColorOverrides,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import s from "./workshop-card.module.css";

interface Props extends Workshop {}

export const WorkshopCard: FC<Props> = ({
  name,
  description,
  day,
  attending,
  capacity,
  attendants,
  accountPrograms,
  accountTypes,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);
  const getWorkshopChipColor = (
    item: AccountProgram | AccountType
  ):
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined => {
    switch (item) {
      case "MEDICINE": {
        return "primary";
      }
      case "DENTAL": {
        return "secondary";
      }
      case "PHARMACY": {
        return "success";
      }
      case "OTHER": {
        return "error";
      }
      default:
        return undefined;
    }
  };

  const attendantEls = attendants?.map((x, i) => (
    <div className={s.attendant} key={x.id}>
      {i + 1}. {x.name} ({x.email})
    </div>
  ));

  const workshopChips = [...accountPrograms, ...accountTypes].map((item) => {
    const color = getWorkshopChipColor(item);
    return (
      <Grid item key={item}>
        <Chip label={item} color={color} />
      </Grid>
    );
  });

  return (
    <Box mb={2}>
      <Card
        style={{
          flex: 1,
          height: "100%",
          padding: "20px 10px 20px 10px",
          background: "#f0f0f0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <Grid container direction="column" mt={0} mb={2} spacing={1}>
              <Grid item className={s.name}>
                {name}
              </Grid>
              <Grid item>
                <div className={s.description}>{description}</div>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  {workshopChips}
                </Grid>
              </Grid>
            </Grid>
            <Button onClick={toggle} variant="outlined">
              {expanded ? "Hide attendants" : "Show attendants"}
            </Button>
          </Grid>
          <Grid item md={3} xs={12} className={s.right}>
            <div className={s.day}>{day}</div>
            <div className={s.attending}>
              {attending}/{capacity}
            </div>
          </Grid>
          {expanded && (
            <Grid item xs={12} className={s.expanded}>
              <div className={s.expandedTitle}>Attendants</div>
              {attendantEls}
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
};
