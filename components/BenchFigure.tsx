import { BASE_PATH } from "@/lib/site";

// Device illustrations (AI-generated, labelled as such) until real bench photos
// replace them: drop photos in public/images/ under the same names.
function sources(name: string) {
  const at = (w: number) => `${BASE_PATH}/images/${name}-${w}.webp`;
  return { src: at(1536), srcSet: `${at(768)} 768w, ${at(1536)} 1536w` };
}

export default function BenchFigure() {
  return (
    <figure className="m-0">
      <div className="grid gap-3 md:grid-cols-[1.75fr_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...sources("bench")}
          sizes="(min-width: 768px) 66vw, 100vw"
          width={1536}
          height={1024}
          loading="lazy"
          alt="The wire loop of an EM probe held just above a USB-form-factor security device, with an amber waveform on an oscilloscope behind it"
          className="aspect-[3/2] w-full rounded-lg border border-line object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...sources("device-open")}
          sizes="(min-width: 768px) 33vw, 100vw"
          width={1536}
          height={1024}
          loading="lazy"
          alt="An opened USB security device viewed from above, with a secure-element chip on the circuit board beside its USB connector"
          className="aspect-[3/2] w-full rounded-lg border border-line object-cover md:aspect-auto md:h-full"
        />
      </div>
      <figcaption className="mt-3 text-[13px] text-fg-subtle">
        AI-generated illustrations of the test setup and device.
      </figcaption>
    </figure>
  );
}
