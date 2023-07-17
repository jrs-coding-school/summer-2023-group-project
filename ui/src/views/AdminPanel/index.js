import { useEffect, useState } from "react";
import { getAllUsers } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";

function AdminPanel(props) {
  const [users, setUsers] = useState();
  console.log(users);

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    { field: "firstname", headerName: "First name", width: 130, editable: true },
    { field: "lastname", headerName: "Last name", width: 130, editable: true },
    { field: "username", headerName: "Username", width: 130, editable: true },
    { field: "email", headerName: "Email", width: 130, editable: true },
    { field: "zipcode", headerName: "Zip Code", width: 130, editable: true },
    { field: "points", headerName: "Snitch Points", width: 130, editable: true },
    { field: "createdAt", headerName: "Date Created", width: 130, editable: true },
    { field: "role", headerName: "Role", width: 130, editable: true },
  ];

  const rows = users;

  useEffect(() => {
    const getAllUsersData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    getAllUsersData();
  }, []);

  useEffect(() => {
    console.log(users)
  }, [users]);

  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ height: 620, width: "100%" }}>
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default AdminPanel;
