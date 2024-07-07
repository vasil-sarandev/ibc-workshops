import { FC, useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { Workshop } from "@models";
import { Textfield } from "@components";
import { WorkshopCard } from "./card";
import { useSubscribeToWorkshops } from "./util";
import s from "./workshops.module.css";

interface Props {}

export const WorkshopsTab: FC<Props> = () => {
  const { workshops } = useSubscribeToWorkshops();

  const [filter, setFilter] = useState<string>("");
  const [filtered, setFiltered] = useState<Workshop[]>(workshops);

  const handleFilterChange = useCallback(
    (filter: string) => {
      if (!filter) {
        setFiltered(workshops);
        return;
      } else {
        const matched = workshops.filter((workshop) => {
          return workshop.name.toLowerCase().includes(filter.toLowerCase());
        });
        setFiltered(matched);
      }
    },
    [workshops]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterChangeDebounced = useCallback(
    debounce(handleFilterChange, 500),
    [handleFilterChange]
  );

  useEffect(() => {
    handleFilterChangeDebounced(filter);
  }, [filter, handleFilterChangeDebounced]);

  const workshopEls = filtered.map((x) => <WorkshopCard {...x} key={x.id} />);
  return (
    <div className={s.container}>
      <div className={s.filter}>
        <Textfield
          label="Filter"
          value={filter}
          onChange={(val) => setFilter(val as string)}
        />
      </div>
      <div className={s.cards}>{workshopEls}</div>
    </div>
  );
};
