import {
  useTable,
  ShowButton,
  getDefaultSortOrder,
  List,
  FilterDropdown,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const Employees = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [],
    },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Имя"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="last_name"
          title="Фамилия"
          sorter
          defaultSortOrder={getDefaultSortOrder("last_name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="points" title="Валюта" />

        <Table.Column
          title="Действия"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
