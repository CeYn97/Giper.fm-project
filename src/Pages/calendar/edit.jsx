import React, { useEffect, useState } from "react";

import { useForm } from "@refinedev/antd";
import { useNavigation, useResource } from "@refinedev/core";

import { Modal } from "antd";
import dayjs from "dayjs";

import { CalendarForm } from "./components";

export const CalendarEditPage = () => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const { id } = useResource();
  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish, queryResult } = useForm({
    action: "edit",
    id,
    queryOptions: {
      enabled: true,
    },
    meta: {
      select: "*, event_types(*)",
    },
  });

  useEffect(() => {
    const start = queryResult?.data?.data.start;
    const end = queryResult?.data?.data.end;
    const utcStartDate = dayjs(start);
    const utcEndDate = dayjs(end);

    form.setFieldsValue({
      categoryId: queryResult?.data?.data.event_types.id,
      // participantIds: queryResult?.data?.data.participants.map(
      //   (participant) => participant.id,
      // ),
    });

    // if more than 24 hours, set as all day event
    if (utcEndDate.diff(utcStartDate, "hours") >= 23) {
      setIsAllDayEvent(true);
      form.setFieldsValue({
        rangeDate: [utcStartDate, utcEndDate],
      });
    } else {
      form.setFieldsValue({
        date: utcStartDate,
        time: [utcStartDate, utcEndDate],
      });
    }
  }, [queryResult?.data]);

  const handleOnFinish = async (values) => {
    const { event_types, rangeDate, date, time, ...otherValues } = values;

    let start = dayjs();
    let end = dayjs();

    if (rangeDate) {
      start = rangeDate[0].startOf("day");
      end = rangeDate[1].endOf("day");
    } else {
      start = date

        .set("hour", time[0].hour())
        .set("minute", time[0].minute())
        .set("second", 0);

      end = date

        .set("hour", time[1].hour())
        .set("minute", time[1].minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      event_type_id: event_types.id,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  };

  return (
    <Modal
      title="Редактирование события"
      open
      onCancel={() => {
        list("events");
      }}
      okButtonProps={{
        ...saveButtonProps,
      }}
      okText="Сохранить"
      width={560}
    >
      <CalendarForm
        isAllDayEvent={isAllDayEvent}
        setIsAllDayEvent={setIsAllDayEvent}
        form={form}
        formProps={{
          ...formProps,
          onFinish: handleOnFinish,
        }}
      />
    </Modal>
  );
};
