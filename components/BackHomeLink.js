import ButtonLink from "./ButtonLink";

const BackHomeLink = () => {
  return (
    <div className="border-b border-gray-200 pb-3 my-2 md:pb-6 md:mb-10">
      <div className="md:hidden">
        <ButtonLink href="/dash" icon="chevron_left" text="Back" size="sm" />
      </div>
      <div className="hidden md:inline">
        <ButtonLink href="/dash" icon="chevron_left" text="Back" size="md" />
      </div>
    </div>
  );
};

export default BackHomeLink;
