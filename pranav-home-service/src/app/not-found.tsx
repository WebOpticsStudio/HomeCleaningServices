import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <Container className="max-w-xl py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-soft">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href={ROUTES.home}>Go home</ButtonLink>
        <ButtonLink href={ROUTES.services} variant="outline">
          View services
        </ButtonLink>
      </div>
    </Container>
  );
}
