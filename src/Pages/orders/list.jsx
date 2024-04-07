import {
  useTable,
  ShowButton,
  getDefaultSortOrder,
  List,
  FilterDropdown,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";
import { DataField } from "@refinedev/antd";

export const ListOrders = () => {
  const { tableProps, sorter, filters } = useTable({
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
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column
          dataIndex={["products", "title"]}
          title="Название"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
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
          defaultSortOrder={getDefaultSortOrder("last_name", sorter)}
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
