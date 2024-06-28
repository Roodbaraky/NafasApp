export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="max-w-[1200px] w-screen flex flex-col mx-auto min-h-screen bg-white sm:border-l sm:border-r">
      {children}
    </section>
  );
};
