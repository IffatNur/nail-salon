import useAdmin from "@/hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin()
    // console.log(isAdmin);
    return (
      <div>
        {
          isAdmin === true ?
          <><div>Admin</div></> 
          :
          <><div>Not Admin</div></>
        }
      </div>
    );
};

export default Dashboard;