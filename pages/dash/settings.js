import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import Categories from "../../components/Settings/Categories";
import Profile from "../../components/Settings/Profile";
import Title from "../../components/Title";

const Settings = () => {
  return (
    <>
      <Title title="Settings" />

      <DashLayout>
        <BackHomeLink />
        <PageTitle title="Settings" />
        <Profile />
        <PageTitle title="Categories" />
        <Categories />
      </DashLayout>
    </>
  );
};

export default Settings;
