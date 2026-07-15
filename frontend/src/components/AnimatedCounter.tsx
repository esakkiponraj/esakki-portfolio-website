import CountUp from 'react-countup';

interface Props {
  value: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({ value, suffix = '', label }: Props) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold gradient-text">
        <CountUp end={value} duration={2} enableScrollSpy scrollSpyOnce suffix={suffix} />
      </div>
      <p className="text-fg/60 mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
}
