import { useSimpleList, CreateButton } from "@refinedev/antd";
import { Flex, Card, Image } from "antd";
import { List } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { useCreate } from "@refinedev/core";

export const ProductList = () => {
  const { listProps } = useSimpleList({
    pagination: {
      pageSize: 20,
    },
  });
  const { data: account } = useGetIdentity();

  const { mutate } = useCreate();

  const hasEnoughPoints = (price) => {
    return price <= account?.userInfo?.points;
  };

  return (
    <List>
      <Flex wrap="wrap" gap="middle" justify="center">
        {listProps?.dataSource?.map((product) => {
          return (
            <Card
              key={product.id}
              style={{ width: 300, marginBottom: "20px" }}
              cover={
                <Image
                  alt={product.title}
                  src={product.image}
                  width={300}
                  height={300}
                />
              }
              actions={[
                <CreateButton
                  icon={false}
                  disabled={
                    product.quantity === 0 || !hasEnoughPoints(product.price)
                  }
                  onClick={() =>
                    mutate({
                      resource: "orders",
                      values: {
                        employee_id: account?.userInfo.id,
                        product_id: product.id,
                      },
                    })
                  }
                >
                  Купить
                </CreateButton>,
              ]}
            >
              <Card.Meta
                title={product.title}
                description={`Цена: ${product.price}`}
              />
            </Card>
          );
        })}
      </Flex>
    </List>
  );
};
