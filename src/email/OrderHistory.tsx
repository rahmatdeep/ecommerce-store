import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 100,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/39ded82c-a54a-45fc-8502-32c4a6fc8cbf-p1m1br7rl8r51.jpg",
        description: "some description",
      },
    },
    {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 5000,
        downloadVerificationId: crypto.randomUUID(),
        product: {
          name: "Product Name 2",
          imagePath:
            "/products/39ded82c-a54a-45fc-8502-32c4a6fc8cbf-p1m1br7rl8r51.jpg",
          description: "some description MORE",
        },
      },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History and Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
