import { createFileRoute, useParams } from '@tanstack/react-router';
import OrderDetailClient from '@/components/OrderDetailClient';

function AdminOrderDetail() {
  const { id } = useParams({ from: '/admin/orders/$id' });
  return <OrderDetailClient orderId={id} />;
}

export const Route = createFileRoute('/admin/orders/$id')({ component: AdminOrderDetail });
