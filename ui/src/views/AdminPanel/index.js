import { useEffect, useState, useCallback } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function AdminPanel(props) {
  const [users, setUsers] = useState();
  const [idsToDelete, setIdsToDelete] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "firstname",
      headerName: "First name",
      width: 130,
      editable: true,
    },
    { field: "lastname", headerName: "Last name", width: 130, editable: true },
    { field: "username", headerName: "Username", width: 130, editable: true },
    { field: "email", headerName: "Email", width: 130, editable: true },
    { field: "zipcode", headerName: "Zip Code", width: 130, editable: true },
    {
      field: "points",
      headerName: "Snitch Points",
      width: 130,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      width: 130,
      editable: true,
    },
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

  const handleDeleteUsers = async () => {
    
    Promise.allSettled(idsToDelete.map(async (id) => {
      return await deleteUser(id)
    }))
    .then(async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    });  
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateUser(updatedRow);
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ height: 620, width: "100%" }}>
        <Button
          sx={{ margin: "10px" }}
          variant="contained"
          onClick={handleDeleteUsers}
        >
          Delete Selected
        </Button>
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
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(ids) => {
            setIdsToDelete(ids);
          }}
        />
      </div>
    </>
  );
}

export default AdminPanel;
