import { Card } from "@mui/material";
import { FC } from "react";
import s from "../styles.module.css";
import cn from "classnames";

const cx = cn.bind(s);

interface Props {
  paid: boolean;
}

const getMessage = (paid: boolean) => {
  if (paid) return "Your participation fee is paid.";
  return (
    <div className={s.paidCardInner}>
      Your participation fee is not paid.
      <br />
      <br />
      Please proceed to payment in person at the Registration desk at ul.
      &quot;Zdrave 2&quot;, Monday to Friday from 13.00 to 14.00 o&apos;clock.
    </div>
  );
};

export const PaymentCard: FC<Props> = ({ paid }) => {
  const cardClass = cx({
    [s.danger]: paid === false,
  });
  return (
    <div className={s.container}>
      <Card
        className={cardClass}
        style={{
          flex: 1,
          height: "100%",
          padding: "10px 10px 20px 10px",
          background: "var(--success)",
          color: "#fff",
        }}
      >
        <div className={s.title}>Payment</div>
        <div className={s.info}>{getMessage(paid)}</div>
      </Card>
    </div>
  );
};
