interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <div className="rounded-lg p-2 text-center bg-button hover:bg-button-hover">
      <p className="!text-white">{text}</p>
    </div>
  );
}