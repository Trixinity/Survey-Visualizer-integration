interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}