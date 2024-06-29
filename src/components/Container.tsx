export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="max-w-[1200px] min-w-[320px] w-screen flex flex-col mx-auto h-full bg-white sm:border-l sm:border-r sticky">
      {children}
    </section>
  );
};
