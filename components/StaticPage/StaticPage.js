import { StaticBasicData } from "@/_components/static-page";

const StaticPage = ({ slug }) => {
  return (
    <div className={``}>
      <StaticBasicData slug={slug} />
    </div>
  );
};

export default StaticPage;
