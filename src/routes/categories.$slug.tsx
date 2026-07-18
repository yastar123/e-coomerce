import { createFileRoute, useParams } from '@tanstack/react-router';
import CategoryPageClient from '@/components/CategoryPageClient';

function CategoryRoute() {
  const { slug } = useParams({ from: '/categories/$slug' });
  return <CategoryPageClient slug={slug} />;
}

export const Route = createFileRoute('/categories/$slug')({ component: CategoryRoute });
