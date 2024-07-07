import { FC, useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { UserObjectAdminPanel, useSubscribeToUsers } from "./util";
import { Textfield } from "@components";
import { Button } from "@mui/material";
import { UserCard } from "./card";
import s from "./users.module.css";

const SHOW_MORE_STEP = 20;

interface Props {}

export const UsersTab: FC<Props> = () => {
  const { users } = useSubscribeToUsers();
  const [filter, setFilter] = useState<string>("");
  const [filtered, setFiltered] = useState<UserObjectAdminPanel[]>(users);
  const [displayCount, setDisplayCount] = useState<number>(0);

  const handleShowMoreClick = () => {
    const diff = filtered.length - displayCount;
    if (diff < SHOW_MORE_STEP) {
      setDisplayCount((prev) => prev + diff);
    } else {
      setDisplayCount((prev) => prev + SHOW_MORE_STEP);
    }
  };

  const displayShowMoreButton = useMemo(() => {
    if (filtered.length === 0) {
      return false;
    }
    if (displayCount < filtered.length) {
      return true;
    }
  }, [filtered, displayCount]);

  const handleFilterChange = useCallback(
    (filter: string) => {
      if (!filter) {
        if (users.length > SHOW_MORE_STEP) {
          setDisplayCount(SHOW_MORE_STEP);
        } else {
          setDisplayCount(users.length);
        }
        setFiltered(users);
        return;
      }
      const matched = users.filter((x) => {
        return (
          x.details.name.toLowerCase().includes(filter.toLowerCase()) ||
          x.details.email.toLowerCase().includes(filter.toLowerCase()) ||
          x.details.university.toLowerCase().includes(filter.toLowerCase()) ||
          x.details.program.toLowerCase().includes(filter.toLowerCase()) ||
          (x.paid && filter.toLowerCase() === "paid")
        );
      });
      if (matched.length > SHOW_MORE_STEP) {
        setDisplayCount(SHOW_MORE_STEP);
      } else {
        setDisplayCount(matched.length);
      }
      setFiltered(matched);
    },
    [users]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterChangeDebounced = useCallback(
    debounce(handleFilterChange, 500),
    [handleFilterChange]
  );

  useEffect(() => {
    handleFilterChangeDebounced(filter);
  }, [filter, users, handleFilterChangeDebounced]);

  const userCards = filtered
    .slice(0, displayCount)
    .map((x) => <UserCard {...x} key={x.id} />);

  return (
    <div className={s.container}>
      <div className={s.filter}>
        <Textfield
          label="Filter"
          value={filter}
          onChange={(val) => setFilter(val as string)}
          placeholder={`Search for name, email, university, program or "paid"`}
        />
      </div>
      <div className={s.cards}>{userCards}</div>
      {displayShowMoreButton && (
        <Button onClick={handleShowMoreClick} variant="contained">
          Show more
        </Button>
      )}
    </div>
  );
};
