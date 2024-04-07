import {
  useTable,
  ShowButton,
  getDefaultSortOrder,
  List,
  FilterDropdown,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListOrders = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [],
    },
    syncWithLocation: true,
    meta: {
      select: "*, products(title, price), Employees(name, last_name)",
    },
  });

  console.log(tableProps);

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
          dataIndex={["products", "title"]}
          title="Название"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["Employees", "last_name"]}
          title="Фамилия сотрудника"
          sorter
          defaultSortOrder={getDefaultSortOrder("last_name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex={["products", "price"]} title="Цена" />
      </Table>
    </List>
  );
};
