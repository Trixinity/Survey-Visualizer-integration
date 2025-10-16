interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <div className="rounded-lg p-2 text-center bg-button">
      <p className="!text-white">{text}</p>
    </div>
  );
}