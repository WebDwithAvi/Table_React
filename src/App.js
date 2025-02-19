import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Avatar, Chip, Stack, Typography, Grid } from "@mui/material";
import tableData from "./data";

// JSON Schema for Table Configuration
const tableSchema = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    Cell: ({ row }) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={row.original.image} alt={row.original.name} />
        <Typography>{row.original.name}</Typography>
      </Stack>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    Cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={row.original.status === "Working" ? "success" : "warning"}
      />
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 250,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
  },
  {
    accessorKey: "teams",
    header: "Teams",
    size: 250,
    Cell: ({ row }) => <TeamChips teams={row.original.teams} />,
  },
];

// Component to display Teams with "+3 More" Chip that expands on click
const TeamChips = ({ teams }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack spacing={1}>
      <Grid container spacing={1}>
        {teams.slice(0, expanded ? teams.length : 2).map((team, index) => (
          <Grid item key={index}>
            <Chip label={team} variant="outlined" />
          </Grid>
        ))}
        {!expanded && teams.length > 2 && (
          <Grid item>
            <Chip
              label={`+${teams.length - 2} More`}
              variant="filled"
              color="primary"
              onClick={() => setExpanded(true)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};






const ConfigurableTable = () => {
  return (
    <Box p={2}>
      <MaterialReactTable
        columns={tableSchema}
        data={tableData}
        enableRowSelection
        enablePagination
        enableColumnResizing
      />
    </Box>
  );
};

export default ConfigurableTable;
