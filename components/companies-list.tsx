"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Title } from "@/components/ui/title";
import CompanyCard from "@/components/company-card";

import { Process } from "@/types";

function getProcesses() {
  return axios.get("/api/processes");
}

const CompaniesList = () => {
  const {
    data: processes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["processes"],
    queryFn: getProcesses,
    select: (data) => data.data.processes,
  });

  if (error) return <div>Error: {String(error)}</div>;
  if (isLoading) return <div>Loading...</div>;

  return processes.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {processes.map(({ id, company, steps, position }: Process) => (
        <CompanyCard
          key={id}
          name={company}
          steps={steps}
          position={position}
        />
      ))}
    </div>
  ) : (
    <Title level="sub" className="text-center">
      There are tracked processes yet!
    </Title>
  );
};

export default CompaniesList;
