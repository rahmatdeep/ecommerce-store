import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inActiveCount] = await Promise.all([
    prisma.product.count({
      where: { isAvailableForPurchase: true },
    }),
    prisma.product.count({
      where: { isAvailableForPurchase: false },
    }),
  ]);

  return {
    activeCount,
    inActiveCount,
  };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("Resolved after 2 seconds");
    //   }, 2000);
    // }),
    await getSalesData(),
    await getUserData(),
    await getProductData(),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Sales"
          subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
          body={formatCurrency(salesData.amount)}
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatCurrency(
            userData.averageValuePerUser
          )} Average Value`}
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Products"
          subtitle={`${formatNumber(productData.inActiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
        />
      </div>
    </>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
