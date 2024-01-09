const Dashboard = () => {
  const userData = localStorage.getItem("data");
  const user = JSON.parse(userData);

  return <div>{user.username}</div>;
};

export default Dashboard;
