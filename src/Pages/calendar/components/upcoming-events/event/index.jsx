import React from "react";

import { useNavigation } from "@refinedev/core";

import { Badge } from "antd";
import dayjs from "dayjs";

import { Typography as Text } from "antd";
import styles from "../index.module.css";

export const CalendarUpcomingEvent = ({ item }) => {
  const { show } = useNavigation();
  const { id, title, start, end } = item;
  const isToday = dayjs(start).isSame(dayjs(), "day");
  const isTomorrow = dayjs(start).isSame(dayjs().add(1, "day"), "day");
  const isAllDayEvent =
    dayjs(start).startOf("day").isSame(start) &&
    dayjs(end).endOf("day").isSame(end);

  const renderDate = () => {
    if (isToday) {
      return "Сегодня";
    }

    if (isTomorrow) {
      return "Завтра";
    }

    return dayjs(start).format("MMM DD");
  };

  const renderTime = () => {
    if (isAllDayEvent) {
      return "Весь день";
    }

    return `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`;
  };

  return (
    <div
      onClick={() => {
        show("events", item.id);
      }}
      key={id}
      className={styles.item}
    >
      <div className={styles.date}>
        <Badge className={styles.badge} />
        <Text.Text>{`${renderDate()}, ${renderTime()}`}</Text.Text>
      </div>
      <Text.Text className={styles.title}>{title}</Text.Text>
    </div>
  );
};
