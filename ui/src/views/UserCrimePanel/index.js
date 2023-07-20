import { useEffect, useState, useCallback } from "react";
import { getMe, deleteUserReport, updateUserReports } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function UserCrimePanel(props) {
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
    const getLoggedInUserData = async () => {
      const usersData = await getMe();
      setUsers(usersData);
    };
    getLoggedInUserData();
  }, []);

  const handleDeleteUserReports = async () => {
    
    Promise.allSettled(idsToDelete.map(async (userId) => {
      return await deleteUserReport(userId)
    }))
    .then(async () => {
      const usersData = await getLoggedInUserData();
      setUsers(usersData);
    });  
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateUserReports(updatedRow);
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
          onClick={handleDeleteUserReports}
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

export default UserCrimePanel;