import { User } from "@models";
import { FC } from "react";
import { getAvailableDays, useSubscribeToWorkshops } from "../util";
import { WorkshopItem } from "../workshop";
import s from "./list.module.css";
import { useConfirm } from "material-ui-confirm";
import { useAuth0 } from "@auth0/auth0-react";
import { addParticipantToWorkshop } from "assets/firebase";
import { useSnackbar } from "@components";

interface Props {
  user: User;
}

export const WorkshopsList: FC<Props> = ({ user }) => {
  const confirm = useConfirm();
  const { user: authUser } = useAuth0();
  const { loading, workshops } = useSubscribeToWorkshops(user);
  const { setMessage } = useSnackbar();

  //this is a protected page.
  const userId = authUser?.sub as string;

  const attemptSignUp = (workshopId: string) => {
    confirm({
      description:
        "You can only sign up for one workshop each day of the congress.",
    }).then(async () => {
      try {
        const participant = {
          name: user.details.name,
          email: user.details.email,
          // this is a protected page.
          id: userId,
        };
        await addParticipantToWorkshop(participant, workshopId);
        setMessage("Successfully signed up for workshop.");
      } catch (e) {
        setMessage("Failed to sign up for workshop. please try again later.");
        throw new Error("Signing up for workshop failed. attemptSignUp");
      }
    });
  };

  const userWorkshops = workshops.filter((x) => {
    if (x.attendants) {
      return x.attendants.find((a) => a.id === userId);
    }
    return false;
  });

  const available = getAvailableDays(userWorkshops);

  const workshopEls = workshops.map((x) => (
    <WorkshopItem
      {...x}
      key={x.name}
      attemptSignUp={attemptSignUp}
      available={available}
      user={user}
      userWorkshopsLength={userWorkshops.length}
    />
  ));
  const myWorkshopEls = userWorkshops.map((x) => (
    <WorkshopItem
      {...x}
      key={x.name}
      attemptSignUp={attemptSignUp}
      available={available}
      user={user}
      userWorkshopsLength={userWorkshops.length}
    />
  ));

  if (loading) return <></>;
  if (workshops.length === 0) return <>No workshops are currently available</>;
  return (
    <div className={s.container}>
      {!!userWorkshops.length && (
        <>
          <div className={s.workshopsTitle}>My Workshops</div>
          {myWorkshopEls}
        </>
      )}
      <div className={s.workshopsTitle}>Workshops</div>
      {workshopEls}
    </div>
  );
};
