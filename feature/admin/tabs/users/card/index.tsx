import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { UserObjectAdminPanel } from "../util";
import s from "./user-card.module.css";
import { useConfirm } from "material-ui-confirm";
import {
  acceptUserAbstract,
  declineUserAbstract,
  markUserAsAttending,
  markUserAsNotAttending,
  markUserAsNotPaid,
  markUserAsPaid,
} from "assets/firebase";
import { useSnackbar } from "@components";

interface Props extends UserObjectAdminPanel {}

export const UserCard: FC<Props> = ({
  type,
  details,
  paid,
  attending,
  status,
  id,
}) => {
  const [expanded, setExpanded] = useState(false);
  const confirm = useConfirm();
  const { setMessage } = useSnackbar();

  const toggle = () => setExpanded((prev) => !prev);

  const handleMarkAsPaid = () => {
    confirm({ description: "Do you want to mark the user as paid?" }).then(
      async () => {
        await markUserAsPaid(id);
        setMessage("User marked as paid.");
      }
    );
  };

  const handleMarkAsNotPaid = () => {
    confirm({ description: "Do you want to mark the user as NOT paid?" }).then(
      async () => {
        await markUserAsNotPaid(id);
        setMessage("User marked as NOT paid.");
      }
    );
  };

  const handleMarkAsAttending = () => {
    confirm({ description: "Do you want to mark the user as attending?" }).then(
      async () => {
        await markUserAsAttending(id);
        setMessage("User marked as attending.");
      }
    );
  };

  const handleMarkAsNotAttending = () => {
    confirm({
      description: "Do you want to mark the user as NOT attending?",
    }).then(async () => {
      await markUserAsNotAttending(id);
      setMessage("User marked as NOT attending.");
    });
  };

  const handleAcceptAbstract = () => {
    confirm({ description: "Do you want to accept the user abstract?" }).then(
      async () => {
        await acceptUserAbstract(id);
        setMessage("User abstract accepted.");
      }
    );
  };

  const handleDeclineAbstract = () => {
    confirm({ description: "Do you want to decline the user abstract?" }).then(
      async () => {
        await declineUserAbstract(id);
        setMessage("User abstract declined.");
      }
    );
  };

  return (
    <div className={s.container}>
      <Box mb={2}>
        <Card
          style={{
            padding: "25px 20px",
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={3} xs={8}>
              <div className={s.name}>{details.name}</div>
            </Grid>
            <Grid item md={1} xs={4}>
              <div className={s.paid}>Paid: {paid ? "Yes" : "No"}</div>
            </Grid>
            <Grid item md={3} xs={8}>
              <div className={s.email}>{details.email}</div>
            </Grid>
            <Grid item md={2} xs={4}>
              <div className={s.name}>
                Attending: {attending ? "Yes" : "No"}
              </div>
            </Grid>
            <Grid item md={2} xs={10}>
              <div className={s.name}>{type}</div>
            </Grid>
            <Grid item md={1}>
              <div className={s.toggle} onClick={toggle}>
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </div>
            </Grid>
          </Grid>
          {expanded && (
            <div className={s.separator}>
              <div>Phone: {details.phone}</div>
              <div>Age: {details.age}</div>
              <div>Country: {details.country}</div>
              <div>University: {details.university}</div>
              <div>Program: {details.program}</div>
              <div>Academic Year: {details.academicYear}</div>
              {type === "ACTIVE" && <div>Abstract Status: {status}</div>}
              <div className={s.buttons}>
                {paid ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleMarkAsNotPaid}
                  >
                    Mark as NOT paid
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMarkAsPaid}
                  >
                    Mark as paid
                  </Button>
                )}
                {attending ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleMarkAsNotAttending}
                  >
                    Mark as NOT attending
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMarkAsAttending}
                  >
                    Mark as attending
                  </Button>
                )}
              </div>
              {type === "ACTIVE" && (
                <div className={s.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAcceptAbstract}
                  >
                    Accept abstract
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeclineAbstract}
                  >
                    Decline abstract
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </Box>
    </div>
  );
};
