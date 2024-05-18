import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

// PurchaseRecieptEmail.PreviewProps = {
//   product: {
//     name: "Product Name",
//     imagePath:
//       "/products/39ded82c-a54a-45fc-8502-32c4a6fc8cbf-p1m1br7rl8r51.jpg",
//     description: "some description",
//   },
//   order: {
//     id: crypto.randomUUID(),
//     createdAt: new Date(),
//     pricePaidInCents: 100,
//   },
//   downloadVerificationId: crypto.randomUUID(),
// } satisfies PurchaseRecieptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
