export const LoadingComponent = (): JSX.Element => {
  return (
    <div className="w-full mx-auto flex flex-col justify-center ">
      <img
        className="max-w-xs mx-auto"
        src="https://media.tenor.com/DHGvsLhTOowAAAAM/meme-pikachu.gif"
        alt="Loading gif"
      />

      <div className="text-center my-10">Wait one sec...</div>
      <div className=" flex flex-row flex-wrap w-full"></div>
    </div>
  );
};
