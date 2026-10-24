import { CheckCircle2, Clock, MapPin, PhoneCall } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/config/site';
import { serviceAreaLocations } from '../data/service-areas';

export function ServiceAreaSection() {
  return (
    <Section
      id="service-areas"
      title="Service Areas in & around Kolar"
      description="We bring professional cleaning right to your doorstep across Kolar and nearby taluks in Karnataka."
      tone="tint"
    >
      {/* Notice Banner regarding placeholder coverage */}
      <div className="shadow-soft mb-8 rounded-card border border-primary/20 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">Headquartered in Kolar City, Karnataka</p>
              <p className="text-sm text-ink-soft">
                All listed areas outside Kolar city limits are configurable sample coverage areas.
                Slot availability is confirmed via our rapid booking callback.
              </p>
            </div>
          </div>
          <ButtonLink
            href={siteConfig.contact.phoneHref}
            variant="outline"
            size="md"
            className="shrink-0"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            Check Your Area
          </ButtonLink>
        </div>
      </div>

      {/* Grid of Locations */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceAreaLocations.map((loc) => {
          const isConfirmed = loc.status === 'confirmed';

          return (
            <article
              key={loc.id}
              className="shadow-soft flex flex-col rounded-card border border-grout bg-white p-5 transition-all hover:border-primary/40 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-ink">{loc.name}</h3>
                <Badge
                  className={
                    isConfirmed
                      ? 'border-primary/20 bg-primary/10 text-primary'
                      : 'border-amber-500/20 bg-amber-500/10 text-amber-700'
                  }
                >
                  {isConfirmed ? (
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="size-3 text-primary" /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3 text-amber-600" /> Verify Slot
                    </span>
                  )}
                </Badge>
              </div>

              <p className="mt-1 text-xs font-semibold text-primary">{loc.distanceNote}</p>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{loc.description}</p>

              <div className="mt-4 border-t border-grout pt-4">
                <p className="text-xs font-semibold tracking-wider text-ink-soft/80 uppercase">
                  Popular Services:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {loc.popularFor.map((serviceName) => (
                    <span
                      key={serviceName}
                      className="rounded bg-rinse px-2 py-0.5 text-xs font-medium text-ink-soft"
                    >
                      {serviceName}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom helper */}
      <p className="mt-8 text-center text-sm text-ink-soft">
        Don&apos;t see your specific locality or village?{' '}
        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Message us on WhatsApp
        </a>{' '}
        with your location pin and we will confirm availability in minutes.
      </p>
    </Section>
  );
}
