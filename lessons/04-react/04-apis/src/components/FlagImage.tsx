type FlagImageProps = {
  src: string;
  alt: string;
};

export const FlagImage = ({ src, alt }: FlagImageProps) => {
  return <img className="h-auto w-12 rounded shadow" src={src} alt={alt} />;
};
