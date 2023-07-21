import { useEffect, useState, useCallback } from "react";
import { getMe, getReportByUserId, deleteUserReport, updateUserReports } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function UserCrimePanel(props) {
  const [report, setReport] = useState();
  const [idsToDelete, setIdsToDelete] = useState();

  const columns = [
    { field: "id", headerName: "Report ID", width: 100, editable: false },
    {
      field: "address",
      headerName: "Address",
      width: 130,
      editable: true,
    },
    { field: "zipcode", headerName: "Zipcode", width: 130, editable: true },
    { field: "city", headerName: "City", width: 130, editable: true },
    { field: "county", headerName: "County", width: 130, editable: true },
    { field: "state", headerName: "State", width: 130, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      editable: true,
    },
    { field: "isOngoing", headerName: "Is Ongoing?", width: 130, editable: true },
  ];

  const rows = report;

  useEffect(() => {
    const getUserReportData= async () => {
        const userData = await getMe();
        const userId = userData.id
        const reportData = await getReportByUserId(userId);
        //reportData is an empty array
        console.log('report data: ', reportData)
      setReport(reportData);
    };
    getUserReportData();
  }, []);

  const handleDeleteUserReports = async () => {
  
    Promise.allSettled(idsToDelete.map(async (id) => {
      return await deleteUserReport(id)
    }))
    .then(async () => {
      const userData = await getMe();
      const userId = userData.id
      const reportData = await getReportByUserId(userId);
      setReport(reportData);
    }); 
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateUserReports(updatedRow);
  }, []);

  if (!report) {
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