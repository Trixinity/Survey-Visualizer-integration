interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className="bg-card rounded-lg p-6 h-fit">
      <h3 className="font-semibold text-center mb-3">{title}</h3>
      <p className="text-center">{subtitle}</p>
      {children}
    </div>
  );
}