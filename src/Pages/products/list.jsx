import { useSimpleList, CreateButton } from "@refinedev/antd";
import { Flex, Card } from "antd";
import { List } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";

export const ProductList = () => {
  const { listProps } = useSimpleList();
  const { data: account } = useGetIdentity();

  console.log(account);

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
              style={{ width: 300 }}
              cover={<img alt={product.title} src={product.image} />}
              actions={[
                <CreateButton
                  icon={false}
                  disabled={
                    product.quantity === 0 || !hasEnoughPoints(product.price)
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
